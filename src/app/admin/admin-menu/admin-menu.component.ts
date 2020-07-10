import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// For MDB Angular Free
import { CollapseModule, WavesModule } from 'angular-bootstrap-md'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TermService } from 'src/app/services/admin/Term/term.service';
@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  dtOptions: any = {};
  expanded= false;
  blurBg = false;
  notification = false;
  blackAndWhite = false;
  localStorage: any;
  langCss = document.getElementById('langCss');


  close(){
    this.expanded =false;
    this.blurBg = false;
    this.notification = false;
    var list = document.getElementsByClassName("clickable");
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('openDrop', 'clicked')
   }
  }

  // dropdown menu method :-
  openDropDown(e){
    var list = document.getElementsByClassName("clickable");
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('openDrop')
   }
    if(e.target.classList.contains('clicked')){
      e.target.classList.remove('openDrop', 'clicked')
    }else{

      for (var x = 0; x < list.length; x++) {
        list[x].classList.remove('clicked')
     }
      e.target.classList.add('openDrop', 'clicked')
    }
  }

  expand(){
    this.expanded = !this.expanded;
    this.blurBg = !this.blurBg;
  }
  notify(){
    this.blurBg = !this.blurBg;
    this.notification = !this.notification;

  }
  constructor(private modalService: NgbModal, public  translate: TranslateService, 
    private myService: TermService, 
    public AuthService: AuthService, public Router: Router) {
    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/ar|en/) ? browserLang : 'ar');
    translate.use('ar');
  }

  translateUse(langVal){
    this.translate.use(langVal);
    document.documentElement.setAttribute('lang', langVal);
    this.langCss.setAttribute('href', `assets/css/styles-${langVal}.css`);
  }


  specialColors(){
    this.blackAndWhite = !this.blackAndWhite;
    if(this.blackAndWhite == true) document.body.classList.add('specialColors');
    else document.body.classList.remove('specialColors');
  }

  getUserName(){
    return localStorage.getItem('UserName');
  }

  getUserRoleCondition(role){
    return localStorage.getItem('UserRole') == role;
  }

  fontSize(size){
    document.querySelector('body').style.fontSize = size;
  }

  elements
  ngOnInit(){

    // this.myService.GetAll().subscribe((res) => {
    //   this.elements = res.List;
    // } )
  }
}
