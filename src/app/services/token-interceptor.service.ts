import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http'
import { AuthService } from './auth.service';
import { errorHandling } from '../globals';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, public Router: Router ){}
  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
      }
    )
    return next.handle(tokenizedReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401 || err.status === 403) {
              // Invalidate user session and redirect to login/home
              localStorage.clear();
              this.Router.navigate(['/login']);
          }

          // return the error back to the caller
          return throwError(err);
        }
      }),
      finalize(() => {
        // any cleanup or final activities
      })
    );


  }

  //

}
