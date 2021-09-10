/**
 * By clavatar
 */

import { createAction, props } from "@ngrx/store";
import { AuthenticatedUser } from "../models/authenticated-user.model";
import { Credentials } from "../models/credentials.model";
import { User } from "../models/user.model";

export const login = createAction(
  "[User] Login",
  props<Credentials>()
);

export const loginSuccess = createAction(
  "[User] Login success",
  props<AuthenticatedUser>()
);

export const setAuthenticatedUser = createAction(
  "[User] set authenticated user",
  props<User>()
);

export const signUp = createAction(
  "[User] Sign Up",
  props<User>()
);

export const signUpSuccess = createAction("[User] Sign Up success");