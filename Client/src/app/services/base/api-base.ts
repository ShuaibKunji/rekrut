import { LocalStorageService } from "../local-storage/local-storage.service";

export class ApiBase {
  private static baseURL: string = "https://localhost:7027";
  private storage: LocalStorageService;
  protected constructor() {
    this.storage = new LocalStorageService();
  }

  get authToken() {
    return this.storage.accessToken;
  }

  protected transformOptions(options: any): Promise<any> {
    options.headers = options.headers.append(
      "authorization",
      `Bearer ${this.authToken}`
    );
    return Promise.resolve(options);
  }

  protected getBaseUrl(defaultURL: string): string {
    if (defaultURL !== "")
      console.log("Unexpected baseURL in apiclient: " + defaultURL);
    return ApiBase.baseURL;
  }
}
