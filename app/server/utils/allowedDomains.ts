import { Request } from 'express';

export default (req: Request): string[] => {
  const { host } = req.headers;
  if (host.includes('localhost')) {
    return [
      'http://localhost:40410',
      'https://dashboard.api.2ra.co.uk',
      'https://station.api.2ra.co.uk',
    ];
  }
  if (host.includes('2ra.co.uk')) {
    return ['https://dashboard.api.2ra.co.uk', 'https://risk.ui.2ra.co.uk'];
  }
  if (host.includes('rreframe.com')) {
    return ['https://dashboard.api.rreframe.com', 'https://risk.rreframe.com'];
  }
  return ['https://dashboard.api.rradar.com', 'https://risk.rradar.com'];
};
