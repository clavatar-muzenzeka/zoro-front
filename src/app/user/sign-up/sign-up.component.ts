import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { AppState } from "src/app/store/app.state";
import {
  MatchToValidator,
  MATCH_TO_ERROR_NAME,
} from "src/app/validators/match-to.validator";
import { signUp, signUpSuccess } from "../store/user.actions";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      MatchToValidator.compareToControl("confirmPassword"),
    ]),
    confirmPassword: new FormControl(
      "",
      MatchToValidator.compareToControl("password")
    ),
  });

  constructor(private _store: Store<AppState>, private _actions$: Actions, private _router: Router) {}

  ngOnInit(): void {
    this._actions$.pipe(
      ofType(signUpSuccess),
      take(1)
    ).subscribe(
      r=>this._router.navigateByUrl('/')
    )
  }

  signUp() {
    this._store.dispatch(signUp(this.userForm.value));
  }

  get userNameIsRequiredError(): boolean {
    return this.userForm.get("username").hasError("required");
  }

  get nameIsRequiredError(): boolean {
    return this.userForm.get("name").hasError("required");
  }

  get passwordIsRequiredError(): boolean {
    return this.userForm.get("password").hasError("required");
  }

  get passwordMinLengthError(): boolean {
    return this.userForm.get("password").hasError("minlength");
  }

  get passwordMatchToError(): boolean {
    return this.userForm.get("password").hasError(MATCH_TO_ERROR_NAME);
  }

  get confirmPasswordMatchToError(): boolean {
    return this.userForm.get("confirmPassword").hasError(MATCH_TO_ERROR_NAME);
  }
}
