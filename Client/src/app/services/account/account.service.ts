import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { AccountsClient, RegistrationForm } from "../base/apiclient";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  client: AccountsClient;
  constructor(private http: HttpClient) {
    this.client = new AccountsClient(http);
  }

  public registerNewApplicant(form: RegistrationForm) {
    return from(this.client.registerNewApplicant(form));
  }

  public isAlreadyRegistered(username: string) {
    return from(this.client.isUserNameTaken(username));
  }

  public isUserNameTaken(email: string) {
    return from(this.client.isAlreadyRegistered(email));
  }

  public getAllApplicants() {
    return from(this.client.getAllApplicants());
  }
}
