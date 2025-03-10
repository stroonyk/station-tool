import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import requestIp from 'request-ip';

export interface ILog {
  '@timestamp': string;
  application: string;
  request: {
    method: Request['method'];
    path: Request['originalUrl'];
    url: string;
    status: Response['statusCode'];
    referrer: string;
  };
  client: {
    type: string;
    accounts_id: number;
    actor_uid: string | null;
    ip: Request['ip'] | null;
    user_agent: Request['headers']['user-agent'];
    name: string | null;
  };
  app: Record<string, any>;
}

const generateLog = (req: Request, res: Response): ILog => {
  return {
    '@timestamp': new Date().toISOString(),
    application: 'Station Reader',
    request: {
      method: req.method,
      path: req.originalUrl,
      url: `${req.protocol}://${req.hostname}${req.originalUrl}`,
      status: res.statusCode,
      referrer: (req.headers.referrer || req.headers.referer) as string,
    },
    client: {
      type: 'Actor',
      ip: requestIp.getClientIp(req),
      actor_uid: res.locals.user?.uid,
      user_agent: req.headers['user-agent'],
      name: res.locals.user
        ? `${res.locals.user.user_first_name} ${res.locals.user.user_last_name}`
        : null,
      accounts_id: res.locals.user ? res.locals.user.user_id : null,
    },
    app: {},
  };
};

// let redisClient: Redis

// if (process.env.REDIS_SENTINEL) {
//   redisClient = new Redis({
//       sentinels: [
//           { host: process.env.REDIS_SENTINEL, port: 26379 },
//           { host: process.env.REDIS_SENTINEL, port: 26379 },
//       ],
//       name: process.env.REDIS_URL
//   })
// }
// else {
//   redisClient = new Redis(process.env.REDIS_URL ?? "")
// }

export default async (req: Request, res: Response, next: NextFunction) => {
  // const log = generateLog(req, res)
  // const JSONLog = JSON.stringify(log)
  // redisClient.rpush("logs/http", JSONLog)
  next();
};
