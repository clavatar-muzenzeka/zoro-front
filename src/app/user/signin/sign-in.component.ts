import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { MatchToValidator, MATCH_TO_ERROR_NAME } from 'src/app/validators/match-to.validator';
import { signUpSuccess, signUp, loginSuccess, login } from '../store/user.actions';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  constructor(
    private _store: Store<AppState>,
    private _actions$: Actions,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._actions$
      .pipe(ofType(loginSuccess), take(1))
      .subscribe((r) => this._router.navigateByUrl("/"));
  }

  login() {
    this._store.dispatch(login(this.loginForm.value));
  }

  get userNameIsRequiredError(): boolean {
    return this.loginForm.get("username").hasError("required");
  }


  get passwordIsRequiredError(): boolean {
    return this.loginForm.get("password").hasError("required");
  }

  get passwordMinLengthError(): boolean {
    return this.loginForm.get("password").hasError("minlength");
  }

}

