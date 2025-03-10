import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import * as path from 'path';
import before from './middleware/before';
import checkForRedirect from './middleware/checkForRedirect';
import { nanoid } from 'nanoid';
// @ts-ignore -> Path is for compiled server code :)
import manifest = require('../client/assets-manifest.json');
import runScriptUnless from './utils/runScriptUnless';
import helmet from 'helmet';
import allowedDomains from './utils/allowedDomains';
import logger from './middleware/logger';
import * as Sentry from '@sentry/node';

export const app: express.Express = express();

const useSentry = !!process.env.SENTRY_DSN;
const dsn = process.env.SENTRY_DSN;
export { useSentry };

if (useSentry) {
  Sentry.init({
    attachStacktrace: true,
    release: 'station-ui@' + process.env.npm_package_version,
    autoSessionTracking: true,
  });
  Sentry.setupExpressErrorHandler(app);
}

app.locals.api_endpoint = process.env.API_ENDPOINT;
app.locals.client_id = process.env.APPLICATION_CLIENT_ID;
console.log('cliet id' + app.locals.client_id);
// app.locals.client_id = process.env.CLIENT_ID;
app.locals.redirect_url_uid = process.env.REDIRECT_URL_UID;
app.locals.manifest = manifest;
app.locals.sentry = {
  enabled: useSentry,
  dsn,
};

app.set('port', 40410);
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../client')));

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, '../views'));

app.use((_req, res, next) => {
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.locals.wpsNonce = nanoid().toString('base64'); // window.__PUBLIC_STATE
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // res.locals.hjNonce = nanoid().toString('base64'); // hotjar
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // res.locals.userHjNonce = nanoid().toString('base64'); // hotjar
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.locals.indexJsNonce = nanoid().toString('base64'); // index js
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.locals.vendorJsNonce = nanoid().toString('base64'); // vendor js
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // res.locals.vgaNonce = nanoid().toString('base64'); // google analytics js
  next();
});

app.use((req, res, next) => {
  const cspMiddleware = helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      'default-src': ["'self'", ...allowedDomains(req)],
      'base-uri': ["'self'"],
      'object-src': ["'none'"],
      'upgrade-insecure-requests': [],
      'img-src': [
        "'self'",
        'https://www.gravatar.com',
        'https://rradar-accounts.imgix.net',
        'https://i0.wp.com',
        'data:',
      ],
      'script-src': [
        `'nonce-${res.locals.wpsNonce}'`,
        `'nonce-${res.locals.indexJsNonce}'`,
        `'nonce-${res.locals.vendorJsNonce}'`,
        "'strict-dynamic'",
        "'sha256-rkcbC14sBMpqWkppJ8aZIM9hm0AaCsNbT77TS7lDpMY='",
        "'sha256-onG1374a6r4AmPIoc7gDI1TaiFZzdN9yE0Y/amaS4r4='",
        "'sha256-lHYu7E7hMsW3q5nM1rDFE8CWhX7zVyFxrNRj4ko6Xq8='",
        "'sha256-vc7s3tISgW4WxNhA4Ub4nJLrkKIUt1rf1OGR3zjuA7U='",
        "'sha256-vMF2eeSdu40MuiUwXZuKQImpEPSIe0M5Cup1ZBRKcrY='",
        "'sha256-wa4ciIQP7fGvcaYx8wCEIbY0mTf8x7rc8huxx6fXKoQ='",
        "'sha256-+YVDg1bwv3hCbFPuA9qW4HuPwSy4dhuT/fZPKpr3tFM='",
      ],
      'style-src': [
        "'self'",
        'https://fonts.googleapis.com',
        'https://use.fontawesome.com',
        'https://cdn.jsdelivr.net',
      ],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'https://use.fontawesome.com',
      ],
      'frame-src': [
        "'self'",
        // "https://vars.hotjar.com",
        ...allowedDomains(req),
      ],
      'connect-src': [
        'https://*.sentry.io',
        // "https://*.hotjar.com",
        // "https://*.hotjar.io",
        // "wss://*.hotjar.com",
        ...allowedDomains(req),
      ],
    },
  });
  cspMiddleware(req, res, next);
});

app.get('/auth', checkForRedirect);
// Don't run before script if accessing client code or hitting auth, readyz or livez endpoints
app.use(runScriptUnless(before, '/auth', '/readyz', '/livez', '/client/*'));

if (process.env.REDIS_URL) {
  app.use(runScriptUnless(logger, '/readyz', '/livez', '/client/*'));
}

const server = app.listen(app.get('port'), () => {
  if (manifest.vendor) {
    const port = (server.address() as any).port;
    console.log(`  App is running at http://localhost:${port}`);
    console.log('  Press CTRL-C to stop\n');
  }
});

app.get('/readyz', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/livez', (req, res) => res.status(200).json({ status: 'ok' }));

// app.get('/station', function (req, res) {
//   res.render('index');
// });
// app.get('/station/*', function (req, res) {
//   res.render('index');
// });
// app.get(['/risk','/risk/*'], function (req, res) {
//   res.render('index');
// });
// app.get('/risk', function (req, res) {
//   res.render('index');
// });
// app.get('/', function (req, res) {
//   res.render('index');
// });
// app.get('/library/:id', function (req, res) {
//   res.render('index');
// });

app.get('*', (req, res) => {
 res.render('index');
});
// app.get('*', (req, res) => {
//   res.status(404);
//   throw new Error('The page requested does not exist.');
// });

export default app;
