import { Injectable } from "@angular/core";
import { FeatureDTO } from "../base/apiclient";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private static access = "ACCESS-TOKEN";
  private static refresh = "REFRESH-TOKEN";
  private static feats = "FEATURES";

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

  public get features(): FeatureDTO[] | null | undefined {
    let features = window.localStorage.getItem(LocalStorageService.feats);
    if (features != null) {
      let result: FeatureDTO[] = JSON.parse(features);
      return result;
    }
    return [];
  }

  public set features(value: FeatureDTO[] | null | undefined) {
    window.localStorage.setItem(
      LocalStorageService.feats,
      JSON.stringify(value)
    );
  }
}
