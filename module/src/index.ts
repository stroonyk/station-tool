import 'core-js';
import './icons';
import { IApplicationFeature } from '@rradar/accounts-module/dist/accounts/applications/features';

export interface IScopeContent {
  uid: string;
  name: string;
  uuid: string;
  explicit: boolean;
  code_friendly_name: string;
}
export interface IScopeGeneral {
  string: {
    uid: string;
    name: string;
    uuid: string;
    explicit: boolean;
    code_friendly_name: string;
  };
}
export interface IPublicState {
  title: string;
  permissions: Record<string, unknown>;
  page: { id: null; extra: Record<string, unknown>; parent: null; grand_parent: null };
  api: {
    clientId: string;
    endpoint: string;
    redirect_url_uid: string;
  };
  user: {
    uid: string;
    user_id: number;
    company_id: number;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    company_name: string;
    user_primary: boolean;
    scope: {
      contents: Array<IScopeContent>;
      features: Array<IApplicationFeature>;
      contents_by_key: IScopeGeneral;
      contents_by_uid: IScopeGeneral;
      features_by_key: IScopeGeneral;
      features_by_uid: IScopeGeneral;
    };
    me: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      telephone: string;
      mobile: string;
      position: string;
      expires_at: string;
      locked: boolean;
      created_at: string;
      updated_at: string;
      expired: false;
      self_signup: false;
      verified: false;
      avatar_id: number;
      'complete?': boolean;
      avatar_url: string;
      'blocked?': boolean;
    };
    company: {
      id: number;
      name: string;
      logo_url: string;
      can_switch: boolean;
      redirect_url: string;
    };
    permissions: {
      AnyUser: Array<string>;
      AdministratorAccess: boolean;
      MyCompany: Array<string>;
      MyPurchase: Array<string>;
      MyCompanyPackage: Array<string>;
      MyCompanyPurchase: Array<string>;
    };
  };
  sentry: { enabled: boolean; dsn: string };
  callsUrl: string;
  stationTitle: string;
  hybrid_monoserver: boolean;
}
