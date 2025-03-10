import * as Sentry from '@sentry/node';
import { NextFunction, Request, Response } from 'express';
import app from '../index';
import Auth from '../utils/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-Control', 'no-cache, no-store');
  let auth: Auth;

  const isSessionTokenPresent: boolean = req.cookies.sessionToken !== undefined;
  const useSentry = !!process.env.SENTRY_DSN;

  const setupAuthHelper = () => {
    try {
      return new Auth();
    } catch (error) {
      throw new Error('Cannot setup Auth() component');
    }
  };

  const setupSentryUser = (user: any) => {
    Sentry.configureScope((scope) => {
      scope.setUser({
        email: user ? user.user_email : 'N/A',
        username: user
          ? `${user.user_first_name} ${user.user_last_name}`
          : 'N/A',
        id: user ? user.user_id : 'N/A',
      });
    });
  };

  const checkForActiveUserSession = async () => {
    try {
      const response = await auth.checkMySessionToken(req.cookies.sessionToken);
      if (response.me !== undefined) {
        res.locals.user = Object.assign({
          ...response.me,
        });
        if (useSentry) {
          setupSentryUser(response.me);
        }
      }
      return response;
    } catch (error) {
      Sentry.captureException(error);
      res.render('pages/error', {
        extra: {
          errorType: 'Authentication',
          errorMessage:
            'There was a problem logging you in. Please try again later.',
        },
      });
    }
  };

  const goToLogin = async () => {
    const { redirect_url } = await auth.redirectToLoginPage();
    res.redirect(
      `${redirect_url}&redirect_url_uid=${app.locals.redirect_url_uid}`
    );
  };

  const init = async (req: Request) => {
    auth = setupAuthHelper();
    if (isSessionTokenPresent) {
      console.log('Session is present');
      const userResponse = await checkForActiveUserSession();
      console.log('User Response: ', userResponse);
      if (userResponse.statusCode === 401) {
        goToLogin();
      } else {
        next();
      }
    } else if (req.params.auth_token === undefined) {
      try {
        goToLogin();
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  init(req);
};
