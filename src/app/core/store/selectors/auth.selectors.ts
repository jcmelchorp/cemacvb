import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../auth/models/user.model';
import { AuthenticationState, authFeatureKey } from '../reducers/auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthenticationState>(authFeatureKey);

export const isOnline = createSelector(
  selectAuthState,
  (state: AuthenticationState): boolean => !!state.user
);
export const isAdmin = createSelector(
  selectAuthState,
  (state: AuthenticationState): boolean => state.isAdmin
);
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthenticationState): User => state.user
);
export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthenticationState): string => state.user.id
);

export const getError = createSelector(
  selectAuthState,
  (state: AuthenticationState): any => state.error
);
