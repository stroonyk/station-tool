export interface IPublicState {
  station: {
    url: string;
    root_folder: string;
    search_folder: string;
    api_key: string;
  };
  user: {
    company_can_switch: boolean;
    company_id: number;
    company_name: string;
    company_sector_id: number;
    id: number;
    raw_scope: {};
    uid: string;
    user_email: string;
    user_expired: boolean;
    user_first_name: string;
    user_id: number;
    user_last_name: string;
    user_primary: boolean;
    company: {
      id: number;
      name: string;
      logo_url: string;
      can_switch: boolean;
      redirect_url: string;
    };
  };
  api: {
    station: string;
    endpoint: string;
  };
  sentry: {
    enabled: boolean;
    dsn: string | null;
    environment: string;
  };
  hybrid_monoserver: boolean;
}
