import Accounts from "@rradar/accounts-module";
import Dashboard from "@rradar/dashboard-sdk";
import { Request, Response } from "express";

class Auth {
  public clientId: string | undefined;
  public dashboard: Dashboard;
  public accounts: Accounts;

  constructor() {
    console.log("utils auth.ts constructor");
    console.log("endpoint is" + process.env.API_ENDPOINT);
    this.dashboard = new Dashboard({ endpoint: process.env.API_ENDPOINT! });
    this.accounts = new Accounts({
      endpoint: process.env.API_ENDPOINT!,
      proxy: true,
    });

    this.clientId = process.env.CLIENT_ID;
  }

  public async redirectToLoginPage() {
    console.log("auth:rediret to login");
    try {
      const redirectURL = await this.dashboard.auth().generateRedirectURL();
      console.log("auth. redirecturl is");
      console.log(redirectURL);
      return redirectURL;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async createSessionFromAuthToken(auth_token: string): Promise<any> {
    try {
      const response = await this.dashboard
        .auth()
        .setupSessionWithAuthToken(auth_token);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async checkMySessionToken(sessionToken: string): Promise<any> {
    console.log(
      "a.checkMySessionToken >---------- seshT:",
      sessionToken.substring(0, 4)
    );
    try {
      await this.dashboard.auth().asUserSession(sessionToken);
      await this.accounts.auth().asUserSession(sessionToken);
      const me = await this.dashboard.me();
      const meAccounts = await this.accounts.me().get();
      return { ...me, ...meAccounts };
    } catch (error) {
      console.log("error");
      console.log(error);
      return error;
    }
  }

  public saveAccessTokenToCookie(
    res: Response,
    sessionToken: string,
    req: Request
  ): void {
    console.log("auth save access token");
    res.cookie("sessionToken", sessionToken, {
      secure: req.secure,
    });
  }

  public getAccessTokenFromCookie(req: Request): string {
    console.log("auth getAccessToekn");
    return req.cookies.sessionToken;
  }
}

export default Auth;
