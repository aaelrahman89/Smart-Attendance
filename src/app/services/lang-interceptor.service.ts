import { Injectable} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Injectable()
export class LangInterceptorService implements HttpInterceptor {
  pageLang = document.documentElement.lang;
  constructor(public  translate: TranslateService){
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.pageLang = event.lang;
     }if (event.lang == 'en'){
      this.pageLang = event.lang;
     }
    });
  }

  intercept(req, next) {
    let langReq = req.clone(
      {
        headers: req.headers.set('Lang', this.pageLang)
      }
    );
    return next.handle(langReq)
  }

  //

}
