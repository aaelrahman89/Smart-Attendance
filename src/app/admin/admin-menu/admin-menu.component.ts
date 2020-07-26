import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSettingDTO } from 'src/app/models/admin/ThemeSetting/ThemeSettingDTO';
// For MDB Angular Free
import { CollapseModule, WavesModule } from 'angular-bootstrap-md'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TermService } from 'src/app/services/admin/Term/term.service';
import { CurrentTermService } from 'src/app/services/admin/Term/current-term.service';
import { Subscription } from 'rxjs';
import { ThemeSettingservice } from 'src/app/services/admin/ThemeSetting/ThemeSetting.service';

@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  @ViewChild('basicModal') basicModal;
  @ViewChild('secondModal') secondModal;

  dtOptions: any = {};
  expanded= false;
  blurBg = false;
  notification = false;
  blackAndWhite = false;
  localStorage: any;
  langCss = document.getElementById('langCss');
  ThemeSettingDTO: ThemeSettingDTO = new ThemeSettingDTO();
  logoSrc: any;
  favIcon: any = document.getElementById('favIcon');



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
    private myService: TermService,  private CurrentTermService: CurrentTermService ,
    public AuthService: AuthService, public Router: Router,
    private ThemeSettingservice:ThemeSettingservice) {
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
  currentTerm
  currentTermSelected
  currentTermCode
  ngOnInit(){

    this.myService.GetAll().subscribe((res) => {
      this.elements = res.List;
     } )


    // Get Theme Settings
    this.ThemeSettingservice.GetTheme().subscribe(res => {
      document.querySelector("body").style.cssText += `--MainBackgorundColor:${res.MainBackgorundColor}`;
      document.querySelector("body").style.cssText += `--MainTextColor:${res.MainTextColor}`;
      document.querySelector("body").style.cssText += `--MainLabel:${res.MainLabel}`;
      console.log('logo is', res.Logo);
      this.logoSrc = res.Logo;
      document.getElementById('favIcon').setAttribute('href', res.Favicon);


 });

    this.CurrentTermService.GetAll().subscribe((res) =>{
      this.currentTerm = res.Name;
      this.currentTermSelected = res.Name;
      this.currentTermCode = res.TermCode;

    })


  }

  getTerms(){
    this.myService.GetAll().subscribe((res) => {
      this.elements = res.List;
     } )

  }
  newSelectedTerm
  changeTerm(e){
    this.newSelectedTerm = e.target.value ;
    console.log(this.newSelectedTerm)

  }
  saveTerm(){
    localStorage.setItem("dynamicTermCode", this.newSelectedTerm)
    console.log(this.newSelectedTerm)
    this.basicModal.hide();
    this.secondModal.hide();
   }
}
