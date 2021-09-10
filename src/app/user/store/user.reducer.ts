import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { loginSuccess, setAuthenticatedUser } from "./user.actions";

export const userFeatureKey = 'user'

export interface UserState {
  authenticatedUser: User;
}

export const userInitialState: UserState = {
  authenticatedUser: null,
};

export const userReducer = createReducer(
  userInitialState,
  on(setAuthenticatedUser, (state: UserState, user) => ({
    ...state,
    authenticatedUser: user,
  }))
);
