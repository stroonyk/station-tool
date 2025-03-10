import { NextFunction, Request, Response } from 'express';
import Auth from '../utils/auth';
import { app } from '../index';

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log('Check For Redirect to /auth');
  const isAuthTokenPresent: boolean = req.query.auth_token !== undefined;
  const auth = new Auth();

  console.log('Checking for Redirect:', req.query.auth_token);

  const goToLogin = async () => {
    console.log('goto login');
    try {
      const response = await auth.redirectToLoginPage();
      console.log('Response: ', response);
      return res.redirect(
        `${response.url}&redirect_url_uid=${app.locals.redirect_url_uid}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (isAuthTokenPresent) {
    try {
      const response = await auth.createSessionFromAuthToken(
        (req.query as any).auth_token
      );

      console.log('Authorizing: ', response);
      // auth.saveAccessTokenToCookie(res, response.auth.token, req);
      auth.saveAccessTokenToCookie(res, response.session_id);
      return res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  } else {
    goToLogin();
  }
};
