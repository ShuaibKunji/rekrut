//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from "rxjs/operators";
import {
  Observable,
  from as _observableFrom,
  throwError as _observableThrow,
  of as _observableOf,
} from "rxjs";
import { Injectable, Inject, Optional, InjectionToken } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from "@angular/common/http";
import { ApiBase } from "./api-base";

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

@Injectable()
export class AccountsClient extends ApiBase {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super();
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null ? baseUrl : this.getBaseUrl("");
  }

  /**
   * @param body (optional)
   * @return Success
   */
  registerNewApplicant(
    body: RegistrationForm | undefined
  ): Observable<boolean> {
    let url_ = this.baseUrl + "/Accounts/RegisterNewApplicant";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("post", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRegisterNewApplicant(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRegisterNewApplicant(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<boolean>;
            }
          } else
            return _observableThrow(response_) as any as Observable<boolean>;
        })
      );
  }

  protected processRegisterNewApplicant(
    response: HttpResponseBase
  ): Observable<boolean> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  /**
   * @param userName (optional)
   * @return Success
   */
  isUserNameTaken(userName: string | undefined): Observable<boolean> {
    let url_ = this.baseUrl + "/Accounts/IsUserNameTaken?";
    if (userName === null)
      throw new Error("The parameter 'userName' cannot be null.");
    else if (userName !== undefined)
      url_ += "userName=" + encodeURIComponent("" + userName) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("get", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processIsUserNameTaken(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processIsUserNameTaken(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<boolean>;
            }
          } else
            return _observableThrow(response_) as any as Observable<boolean>;
        })
      );
  }

  protected processIsUserNameTaken(
    response: HttpResponseBase
  ): Observable<boolean> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  /**
   * @param email (optional)
   * @return Success
   */
  isAlreadyRegistered(email: string | undefined): Observable<boolean> {
    let url_ = this.baseUrl + "/Accounts/IsAlreadyRegistered?";
    if (email === null)
      throw new Error("The parameter 'email' cannot be null.");
    else if (email !== undefined)
      url_ += "email=" + encodeURIComponent("" + email) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("get", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processIsAlreadyRegistered(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processIsAlreadyRegistered(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<boolean>;
            }
          } else
            return _observableThrow(response_) as any as Observable<boolean>;
        })
      );
  }

  protected processIsAlreadyRegistered(
    response: HttpResponseBase
  ): Observable<boolean> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;

          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  /**
   * @return Success
   */
  getAllApplicants(): Observable<ApplicantDTO[]> {
    let url_ = this.baseUrl + "/Accounts/GetAllApplicants";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("get", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processGetAllApplicants(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processGetAllApplicants(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<ApplicantDTO[]>;
            }
          } else
            return _observableThrow(response_) as any as Observable<
              ApplicantDTO[]
            >;
        })
      );
  }

  protected processGetAllApplicants(
    response: HttpResponseBase
  ): Observable<ApplicantDTO[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          if (Array.isArray(resultData200)) {
            result200 = [] as any;
            for (let item of resultData200)
              result200!.push(ApplicantDTO.fromJS(item));
          } else {
            result200 = <any>null;
          }
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

@Injectable()
export class AuthClient extends ApiBase {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super();
    this.http = http;
    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null ? baseUrl : this.getBaseUrl("");
  }

  /**
   * @param body (optional)
   * @return Success
   */
  login(body: LoginRequest | undefined): Observable<AuthResponse> {
    let url_ = this.baseUrl + "/Auth/Login";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("post", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogin(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogin(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponse>;
            }
          } else
            return _observableThrow(
              response_
            ) as any as Observable<AuthResponse>;
        })
      );
  }

  protected processLogin(response: HttpResponseBase): Observable<AuthResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = AuthResponse.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }

  /**
   * @param refreshToken (optional)
   * @return Success
   */
  refreshAccessToken(
    refreshToken: string | undefined
  ): Observable<AuthResponse> {
    let url_ = this.baseUrl + "/Auth/RefreshAccessToken?";
    if (refreshToken === null)
      throw new Error("The parameter 'refreshToken' cannot be null.");
    else if (refreshToken !== undefined)
      url_ += "refreshToken=" + encodeURIComponent("" + refreshToken) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        Accept: "text/plain",
      }),
    };

    return _observableFrom(this.transformOptions(options_))
      .pipe(
        _observableMergeMap((transformedOptions_) => {
          return this.http.request("post", url_, transformedOptions_);
        })
      )
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRefreshAccessToken(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRefreshAccessToken(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<AuthResponse>;
            }
          } else
            return _observableThrow(
              response_
            ) as any as Observable<AuthResponse>;
        })
      );
  }

  protected processRefreshAccessToken(
    response: HttpResponseBase
  ): Observable<AuthResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = AuthResponse.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

export class ApplicantDTO implements IApplicantDTO {
  id?: number;
  fullName?: string | undefined;
  phoneNumber?: string | undefined;
  userName?: string | undefined;
  email?: string | undefined;

  constructor(data?: IApplicantDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.fullName = _data["fullName"];
      this.phoneNumber = _data["phoneNumber"];
      this.userName = _data["userName"];
      this.email = _data["email"];
    }
  }

  static fromJS(data: any): ApplicantDTO {
    data = typeof data === "object" ? data : {};
    let result = new ApplicantDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["fullName"] = this.fullName;
    data["phoneNumber"] = this.phoneNumber;
    data["userName"] = this.userName;
    data["email"] = this.email;
    return data;
  }
}

export interface IApplicantDTO {
  id?: number;
  fullName?: string | undefined;
  phoneNumber?: string | undefined;
  userName?: string | undefined;
  email?: string | undefined;
}

export class AuthResponse implements IAuthResponse {
  authenticationSuccess?: boolean;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  userDetails?: UserDetails;
  profile?: ProfileDTO;
  featureCodes?: FeatureDTO[] | undefined;

  constructor(data?: IAuthResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.authenticationSuccess = _data["authenticationSuccess"];
      this.accessToken = _data["accessToken"];
      this.refreshToken = _data["refreshToken"];
      this.userDetails = _data["userDetails"]
        ? UserDetails.fromJS(_data["userDetails"])
        : <any>undefined;
      this.profile = _data["profile"]
        ? ProfileDTO.fromJS(_data["profile"])
        : <any>undefined;
      if (Array.isArray(_data["featureCodes"])) {
        this.featureCodes = [] as any;
        for (let item of _data["featureCodes"])
          this.featureCodes!.push(FeatureDTO.fromJS(item));
      }
    }
  }

  static fromJS(data: any): AuthResponse {
    data = typeof data === "object" ? data : {};
    let result = new AuthResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["authenticationSuccess"] = this.authenticationSuccess;
    data["accessToken"] = this.accessToken;
    data["refreshToken"] = this.refreshToken;
    data["userDetails"] = this.userDetails
      ? this.userDetails.toJSON()
      : <any>undefined;
    data["profile"] = this.profile ? this.profile.toJSON() : <any>undefined;
    if (Array.isArray(this.featureCodes)) {
      data["featureCodes"] = [];
      for (let item of this.featureCodes)
        data["featureCodes"].push(item.toJSON());
    }
    return data;
  }
}

export interface IAuthResponse {
  authenticationSuccess?: boolean;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  userDetails?: UserDetails;
  profile?: ProfileDTO;
  featureCodes?: FeatureDTO[] | undefined;
}

export class FeatureDTO implements IFeatureDTO {
  featureCode?: string | undefined;
  route?: string | undefined;

  constructor(data?: IFeatureDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.featureCode = _data["featureCode"];
      this.route = _data["route"];
    }
  }

  static fromJS(data: any): FeatureDTO {
    data = typeof data === "object" ? data : {};
    let result = new FeatureDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["featureCode"] = this.featureCode;
    data["route"] = this.route;
    return data;
  }
}

export interface IFeatureDTO {
  featureCode?: string | undefined;
  route?: string | undefined;
}

export class LoginRequest implements ILoginRequest {
  login?: string | undefined;
  password?: string | undefined;

  constructor(data?: ILoginRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.login = _data["login"];
      this.password = _data["password"];
    }
  }

  static fromJS(data: any): LoginRequest {
    data = typeof data === "object" ? data : {};
    let result = new LoginRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["login"] = this.login;
    data["password"] = this.password;
    return data;
  }
}

export interface ILoginRequest {
  login?: string | undefined;
  password?: string | undefined;
}

export class ProfileDTO implements IProfileDTO {
  profileName?: string | undefined;
  profileCode?: string | undefined;

  constructor(data?: IProfileDTO) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.profileName = _data["profileName"];
      this.profileCode = _data["profileCode"];
    }
  }

  static fromJS(data: any): ProfileDTO {
    data = typeof data === "object" ? data : {};
    let result = new ProfileDTO();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["profileName"] = this.profileName;
    data["profileCode"] = this.profileCode;
    return data;
  }
}

export interface IProfileDTO {
  profileName?: string | undefined;
  profileCode?: string | undefined;
}

export class RegistrationForm implements IRegistrationForm {
  userName?: string | undefined;
  fullName?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  profileCode?: string | undefined;

  constructor(data?: IRegistrationForm) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.userName = _data["userName"];
      this.fullName = _data["fullName"];
      this.phoneNumber = _data["phoneNumber"];
      this.email = _data["email"];
      this.password = _data["password"];
      this.profileCode = _data["profileCode"];
    }
  }

  static fromJS(data: any): RegistrationForm {
    data = typeof data === "object" ? data : {};
    let result = new RegistrationForm();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["userName"] = this.userName;
    data["fullName"] = this.fullName;
    data["phoneNumber"] = this.phoneNumber;
    data["email"] = this.email;
    data["password"] = this.password;
    data["profileCode"] = this.profileCode;
    return data;
  }
}

export interface IRegistrationForm {
  userName?: string | undefined;
  fullName?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  profileCode?: string | undefined;
}

export class UserDetails implements IUserDetails {
  userId?: number;
  userName?: string | undefined;
  fullName?: string | undefined;
  userEmail?: string | undefined;

  constructor(data?: IUserDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.userId = _data["userId"];
      this.userName = _data["userName"];
      this.fullName = _data["fullName"];
      this.userEmail = _data["userEmail"];
    }
  }

  static fromJS(data: any): UserDetails {
    data = typeof data === "object" ? data : {};
    let result = new UserDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["userId"] = this.userId;
    data["userName"] = this.userName;
    data["fullName"] = this.fullName;
    data["userEmail"] = this.userEmail;
    return data;
  }
}

export interface IUserDetails {
  userId?: number;
  userName?: string | undefined;
  fullName?: string | undefined;
  userEmail?: string | undefined;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
