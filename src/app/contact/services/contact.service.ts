import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GenericResponseBody } from "src/app/shared/generic.class";
import { environment } from "src/environments/environment";
import { ContactComponent } from "../contact.component";
import { GoogleCompliantContact } from "../model/google-contact.interface";
import { PaginationParams } from "../model/pagination-params.interface";

@Injectable()
export class ContactService {
  constructor(private _http: HttpClient) {}

  saveContact(
    contact: GoogleCompliantContact
  ): Observable<GoogleCompliantContact> {
    return this._http
      .post<GenericResponseBody<GoogleCompliantContact>>(
        environment.apiHost + environment.contactPath,
        contact
      )
      .pipe(
        map((resp: GenericResponseBody<GoogleCompliantContact>) => resp.payload)
      );
  }

  loadContacts(
    paginationParams: PaginationParams
  ): Observable<Array<GoogleCompliantContact>> {
    return this._http
      .get<GenericResponseBody<GoogleCompliantContact>>(
        environment.apiHost +
          environment.contactPath +
          "?" +
          "skip=" +
          paginationParams.skip +
          "&limit=" +
          paginationParams.limit
      )
      .pipe(
        map(
          (resp: GenericResponseBody<any>) =>
            resp.payload
        )
      );
  }
}