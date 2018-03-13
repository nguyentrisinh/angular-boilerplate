import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

  private baseURL = 'https://angular-http-guide.firebaseio.com/';

  constructor() { }

  getBaseUrl(): string {
    return this.baseURL;
  }

}
