import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { AuthClient, AuthResponse, LoginRequest } from "../base/apiclient";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  client: AuthClient;
  private baseURL: string = "https://localhost:7027";
  constructor(private http: HttpClient) {
    this.client = new AuthClient(http, this.baseURL);
  }

  public login(request: LoginRequest): Observable<AuthResponse> {
    return from(this.client.login(request));
  }

  public refreshAccessToken(refreshToken: string): Observable<AuthResponse> {
    return from(this.client.refreshAccessToken(refreshToken));
  }
}
