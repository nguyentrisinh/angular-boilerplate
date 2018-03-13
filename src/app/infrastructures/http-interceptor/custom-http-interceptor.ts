import {NgModule, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {RouterModule, Router, Routes} from '@angular/router';
import 'rxjs/add/observable/of';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted');
    return next.handle(req).catch(err => this.handleError(err));
  }

  // Handle Error function
  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log('caught');
    if (err.status === 401 || err.status === 403) {
      // this.router.navigateByUrl(`/login`);
      console.log('Status 401 UnAuthorize')
      return Observable.of(err.message);
    }
    if (err.status === 404) {
      console.log('Page Not Found');
    }
    // handle your auth error or rethrow
    return Observable.throw(err);
  }
}
