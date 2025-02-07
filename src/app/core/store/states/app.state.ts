import { RouterState } from "@angular/router";
import { Action, ActionReducer, ActionReducerMap, INIT, MetaReducer } from "@ngrx/store";
import { AuthenticationState, authFeatureKey, authReducer } from "../reducers/auth.reducer";
import { configFeatureKey, configReducer, ConfigState } from "../reducers/config.reducer";
import * as authActions from '../actions/auth.actions';
import { routerReducer } from "@ngrx/router-store";
import { environment } from "../../../../environments/environment.prod";
import { routerKey } from "../router";

export interface AppState {
    [authFeatureKey]: AuthenticationState;
    [routerKey]: RouterState;
    [configFeatureKey]: ConfigState
  }
  export const reducers: ActionReducerMap<AppState> = {
    [authFeatureKey]: authReducer,
    [routerKey]: routerReducer,
    [configFeatureKey]: configReducer
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [debug, /* logout */]
    : [];
  
  export function debug(
    reducer: ActionReducer<AppState>
  ): ActionReducer<AppState> {
    return (state: AppState | undefined, action: Action) => {
      console.groupCollapsed(`Action type: ${action.type}`);
      console.log(
        `%c Preview State: `,
        `color: #007bb4; font-weight: bold`,
        state
      );
      console.log(`%c Action: `, `color: #b46c00; font-weight: bold`, action);
      const nextState = reducer(state, action);
      console.log(
        `%c Next State: `,
        `color: #196d00; font-weight: bold`,
        nextState
      );
      console.groupEnd();
      return nextState;
    };
  }
  
  export function logout(
    reducer: ActionReducer<AppState, Action>
  ): ActionReducer<AppState, Action> {
    return (state, action) => {
      if (action != null && action.type === authActions.signOut.type) {
        return reducer(undefined, { type: INIT });
      }
      return reducer(state, action);
    };
  }