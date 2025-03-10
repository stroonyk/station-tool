import Dashboard from '@rradar/dashboard-sdk';
import Station from '@rradar/station-sdk';
export interface IIndexObject {
  count: number;
  message: string;
  pages: {
    current: number;
    first: number;
    last: number;
    next: number;
  };
  overall_count: number;
}
export interface ISuccessfulResponse {
  message: string;
}
export interface IState {
  abbreviation?: string;
  description?: string;
  key?: string;
  name?: string;
  numeric?: number;
  readable?: string;
  valid_from: Date | string | null;
  valid_until?: string | null;
  value: string;
  value_type?: string;
  index?: number;
}

export interface IEditorConfig {
  station: Station;
  pageid: string;
  dashboard: Dashboard;
  classic: boolean;
  navigatedHome: void;
  menuItems: void;
  user: any;
}
export interface IStationProps {
  config: IEditorConfig;
  logo: JSX.Element;
  refresh: boolean;
}
