import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TermInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( req, next){
    let termReq = req.clone(
      {
        headers: req.headers.set('TermCode', "this.pageLang")
      }
    );
    return next.handle(termReq)
  }
}
