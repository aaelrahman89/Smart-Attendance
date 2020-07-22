import { headerStyle } from './../../globals';
import { ThemeSettingservice } from './../../services/admin/ThemeSetting/ThemeSetting.service';
import { ThemeSettingDTO } from './../../models/admin/ThemeSetting/ThemeSettingDTO';
import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/genericService/notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  pageLang = document.documentElement.lang;
  MainBackgorundColor: string;
  MainTextColor: string;
  MainLabel: string;
  themeForm: FormGroup;


  constructor(
    private ThemeSettingservice:ThemeSettingservice,
    public  translate: TranslateService,
    private titleService: Title,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public Router: Router
  ) { }

  subscription: Subscription;
  subscriptionb: Subscription;

  ThemeSettingDTO: ThemeSettingDTO = new ThemeSettingDTO();

   ngOnInit(): void {

    this.themeForm = new FormGroup({
      MainBackgorundColor: new FormControl(''),
      MainTextColor: new FormControl(),
      MainLabel: new FormControl('')
    });

       // Translate Table (Ar & En)
       this.subscription = this.translate.onLangChange
       .subscribe((event: LangChangeEvent) => {
        if(event.lang == 'ar'){
         this.pageLang = event.lang;
         this.titleService.setTitle("   تغير الالون");
         this.getcolor();
        }if (event.lang == 'en'){
         this.pageLang = event.lang;
         this.titleService.setTitle("Theme Setting ");

         this.getcolor();

        }
       });


       this.getcolor();


  }

getcolor(){

  this.ThemeSettingservice.GetTheme().subscribe(res => {

    this.MainBackgorundColor=res.MainBackgorundColor;
    this.MainTextColor=res.MainTextColor;
    this.MainLabel=res.MainLabel;

    this.themeForm.patchValue({
      MainBackgorundColor: res.MainBackgorundColor,
      MainTextColor: res.MainTextColor,
      MainLabel: res.MainLabel
    });

    console.log(res,"color");
    // alert(this.MainLabel);
    //  (this.el.nativeElement as HTMLElement).style.setProperty('--MainBackgorundColor', res.MainBackgorundColor);
    //   (this.el.nativeElement as HTMLElement).style.setProperty('--MainTextColor', res.MainTextColor);
    //  (this.el.nativeElement as HTMLElement).style.setProperty('--MainLabel', res.MainLabel);


           })

}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }

  saveTheme(){
    document.querySelector("body").style.cssText = `--MainBackgorundColor:${this.themeForm.get('MainBackgorundColor').value}`;
     document.querySelector("body").style.cssText += `--MainTextColor:${this.themeForm.get('MainTextColor').value}`;
    document.querySelector("body").style.cssText += `--MainLabel:${this.themeForm.get('MainLabel').value}`;




    this.ThemeSettingservice.PostTheme(this.themeForm.value).subscribe(res => {
      this.getcolor();
    });
  }

  // saveTheme(){
  //   let MainBackgorundColorArray = Array.from(document.getElementsByClassName('MainBackgorundColor') as HTMLCollectionOf<HTMLElement>);
  //   MainBackgorundColorArray.forEach(x => {
  //     x.style.backgroundColor = this.themeForm.get('MainBackgorundColor').value;
  //   })
  //   this.ThemeSettingservice.PostTheme(this.themeForm.value).subscribe(res => console.log(res));

  // }





}
