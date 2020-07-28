import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TermInterceptorService implements HttpInterceptor {

  constructor() {   }
   
  newtermcode
  intercept( req, next){
    this.newtermcode = localStorage.getItem('dynamicTermCode');
    if(this.newtermcode == null){
      this.newtermcode = ""
    }else{
    this.newtermcode = localStorage.getItem('dynamicTermCode');
    }
    let termReq = req.clone(
      {
        headers: req.headers.set('TermCode',  this.newtermcode )
      }
    );
    return next.handle(termReq)
  }
}
