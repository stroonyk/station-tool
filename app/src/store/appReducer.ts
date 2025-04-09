import { IQuestionnaire, IAnswer } from '@rradar/dashboard-sdk';

export enum ACTION_TYPE {
  INITIALISE = 'INITIALISE',
}

export const appInitialState : AppState = {
  appstate: null,
};

type AppState = {
  appstate: any;
};
type UserAction =
  | { type: ACTION_TYPE.INITIALISE };

const appReducer = (state: AppState, action: UserAction) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALISE: {
      return {
        ...state,
      };
    }
    default:
      throw new Error('menu reducer: unknown action type');
  }
};

export default appReducer;
