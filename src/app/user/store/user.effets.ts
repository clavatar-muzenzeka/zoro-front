/**
 * By clavatar
 */

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { login, loginSuccess, setAuthenticatedUser, signUp, signUpSuccess } from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(private _actions$: Actions, private _userService: UserService) {}

  signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(signUp),
      switchMap((user) => {
        return this._userService
          .signUpUser(user)
          .pipe(map((result) => signUpSuccess()));
      })
    )
  );

  signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(login),
      switchMap((credentials) => {
        return this._userService
          .loginUser(credentials)
          .pipe(map((logedInUser) => loginSuccess(logedInUser)));
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginSuccess),
      map((credentials) => {
        this._userService
          .persistAuthenticatedUser(credentials.user);
          this._userService.persistAuthenticatedUserToken(credentials.token)
          return setAuthenticatedUser(credentials.user)
      })
    )
  );
}
