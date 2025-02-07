import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { User } from '../../auth/models/user.model';

export const authFeatureKey = 'auth';
export interface AuthenticationState {
  user: User;
  isAdmin: boolean;
  isOnline: boolean;
  error: any;
}

export const initialState: AuthenticationState = {
  user: {
    id: '',
    name: {},
    primaryEmail: '',
    isVerified: false
  },
  isAdmin: false,
  isOnline: false,
  error: null,
};

export const authReducer = createReducer<AuthenticationState>(
  initialState,
  on(authActions.signInSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isOnline: true,
    };
  }),
  on(authActions.signInFail, (state) => {
    return {
      ...state,
      user: {
        id: '',
        name: {},
        email: '',
        emailVerified: false
      },
    };
  }),
  on(authActions.notAuthenticated, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(authActions.signOutCompleted, (state) => {
    return {
      ...state,
      user: {
        id: '',
        name: {},
        email: '',
        emailVerified: false
      },
      isAdmin: false,
      isTeacher: false,
      isOnline: false,
    };
  }),
  on(authActions.updateAdminRole, (state, action) => {
    return {
      ...state,
      isAdmin: action.isAdmin,
    };
  }),
  on(authActions.updateTeachersRole, (state, action) => {
    return {
      ...state,
      isTeacher: action.isTeacher,
    };
  }),
  on(authActions.updateOnlineStatus, (state, action) => {
    return {
      ...state,
      isOnline: action.isOnline,
    };
  })
);
