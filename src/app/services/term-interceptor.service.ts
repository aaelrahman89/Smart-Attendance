import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { TermService } from './admin/Term/term.service';
TermService
@Injectable({
  providedIn: 'root'
})
export class TermInterceptorService implements HttpInterceptor {

  constructor() { }
   newtermcode = localStorage.getItem('dynamicTermCode')
   

  intercept( req, next){
    let termReq = req.clone(
      {
        headers: req.headers.set('TermCode',  "this.newtermcode" )
      }
    );
    return next.handle(termReq)
  }
}
