import { Injectable } from "@angular/core";
import { FeatureDTO, UserDetails } from "../base/apiclient";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private static access = "ACCESS_TOKEN";
  private static refresh = "REFRESH_TOKEN";
  private static feats = "FEATURES";
  private static deets = "USER_DETAILS";

  public get accessToken(): string | undefined | null {
    return window.localStorage.getItem(LocalStorageService.access);
  }

  public set accessToken(value: string | undefined | null) {
    if (value !== null && value != undefined) {
      window.localStorage.setItem(LocalStorageService.access, value);
    }
  }

  public get refreshToken(): string | undefined | null {
    return window.localStorage.getItem(LocalStorageService.refresh);
  }

  public set refreshToken(value: string | undefined | null) {
    if (value !== null && value != undefined) {
      window.localStorage.setItem(LocalStorageService.refresh, value);
    }
  }

  public get features(): FeatureDTO[] | undefined {
    let features = window.localStorage.getItem(LocalStorageService.feats);
    if (features != null) {
      let result: FeatureDTO[] = JSON.parse(features);
      return result;
    }
    return [];
  }

  public set features(value: FeatureDTO[] | undefined) {
    window.localStorage.setItem(
      LocalStorageService.feats,
      JSON.stringify(value)
    );
  }

  public set userDetails(value: UserDetails | undefined) {
    window.localStorage.setItem(
      LocalStorageService.deets,
      JSON.stringify(value)
    );
  }

  public get userDetails(): UserDetails | undefined {
    let details = window.localStorage.getItem(LocalStorageService.deets);
    if (details != undefined) {
      let result: UserDetails = JSON.parse(details);
      return result;
    }
    return undefined;
  }

  public clear() {
    window.localStorage.clear();
  }
}
