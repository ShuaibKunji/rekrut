import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { AuthClient, AuthResponse, LoginRequest } from "../base/apiclient";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  client: AuthClient;
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.client = new AuthClient(http);
  }

  public login(request: LoginRequest): Observable<AuthResponse> {
    return from(this.client.login(request));
  }

  public refreshAccessToken(refreshToken: string): Observable<AuthResponse> {
    return from(this.client.refreshAccessToken(refreshToken));
  }

  public setAuthTokens(
    accessToken: string | undefined | null,
    refreshToken: string | undefined | null
  ): void {
    this.storage.accessToken = accessToken;
    this.storage.refreshToken = refreshToken;
  }
}
