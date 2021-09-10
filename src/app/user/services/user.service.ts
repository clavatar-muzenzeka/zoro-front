import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import { catchError, map } from "rxjs/operators";
import { GenericResponseBody } from "src/app/shared/generic.class";
import { AuthenticatedUser } from "../models/authenticated-user.model";
import { Credentials } from "../models/credentials.model";

@Injectable()
export class UserService {
  readonly STORAGE_USER_KEY = "[zoro] user";
  readonly STORAGE_TOKEN_KEY = "h1-CFQ.^$";
  constructor(private _httpClient: HttpClient) {}

  signUpUser = (user: User): Observable<boolean> =>
    this._httpClient
      .post<GenericResponseBody<boolean>>(
        environment.apiHost + environment.userPath,
        user
      )
      .pipe(map((r) => true));
  

  loginUser = (credentials: Credentials): Observable<AuthenticatedUser> => this._httpClient.post<GenericResponseBody<AuthenticatedUser>>(
    environment.apiHost+environment.loginPath,
    credentials
  ).pipe(
    map(r=>r.payload)
  )

  persistAuthenticatedUser(user: User) {
    localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(user));
  }

  persistAuthenticatedUserToken(token: string) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, token);
  }

  getAuthenticatedUser() {
      let authenticatedUser = null;
    let userString = localStorage.getItem(this.STORAGE_USER_KEY);
    if(userString){
        try{
            authenticatedUser = JSON.parse(userString)
        }
        catch{}
    }
    return authenticatedUser;
  }

  getAuthenticatedUserToken() {
    localStorage.getItem(this.STORAGE_TOKEN_KEY);
  }
}
