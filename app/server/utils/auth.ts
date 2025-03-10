import { Request, Response } from 'express';
import axios from 'axios';
class Auth {
  clientId: string | undefined;

  constructor() {
    console.log('client id is ' + process.env.CLIENT_ID);
    this.clientId = process.env.CLIENT_ID;
  }

  public async redirectToLoginPage() {
    const api_endpoint = process.env.API_ENDPOINT;
    console.log('redirect to login api endpoint' + api_endpoint);

    try {
      const response = await axios.get(`${api_endpoint}/auth`);
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }
      const { data } = response;
      console.log('response: ' + JSON.stringify(data));
      return data;
    } catch (err) {
      console.dir(err);
      throw new Error(err);
    }
  }

  public async createSessionFromAuthToken(auth_token: string): Promise<any> {
    const api_endpoint = process.env.API_ENDPOINT;

    try {
      const response = await axios.post(`${api_endpoint}/auth`, {
        auth_token: auth_token,
      });
      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      const { data } = response;
      return data;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  public async checkMySessionToken(sessionToken: string): Promise<any> {
    const api_endpoint = process.env.API_ENDPOINT;

    try {
      const response = await axios
        .get(`${api_endpoint}/me`, {
          headers: {
            Authorization: sessionToken,
          },
        })
        .catch((error) => {
          return {
            data: {
              statusCode: error.response.status,
              message: error.response.data.message,
            },
          };
        });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public saveAccessTokenToCookie(res: Response, sessionToken: string): void {
    res.cookie('sessionToken', sessionToken, {
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });
  }

  public getAccessTokenFromCookie(req: Request): string {
    return req.cookies.sessionToken;
  }
}

export default Auth;
