import { Location } from '@angular/common';
import { headerStyle } from './../../globals';
import { ThemeSettingservice } from './../../services/admin/ThemeSetting/ThemeSetting.service';
import { ThemeSettingDTO } from './../../models/admin/ThemeSetting/ThemeSettingDTO';
import { Component, OnInit, ElementRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/genericService/notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { env } from 'process';


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
  Logo:string;
  themeForm: FormGroup;
  fileToUpload:File=null;
imagesUrl:string="/assets/imgs/mainLogo.png";
base64textString:string;
base64textStringicon:string;
Favicon:string;
showLogo:boolean=true;
showLogoChange:boolean=false;

showFavicon:boolean=true;
showFaviconChange:boolean=false;


image;

  constructor(
    private ThemeSettingservice:ThemeSettingservice,
    public  translate: TranslateService,
    private titleService: Title,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    public Router: Router,
    private _sanitizer: DomSanitizer,
    private Location: Location,
    private router: Router,
  ) { }

  subscription: Subscription;
  subscriptionb: Subscription;

  ThemeSettingDTO: ThemeSettingDTO = new ThemeSettingDTO();

   ngOnInit(): void {

    this.themeForm = new FormGroup({
      LogoFileContent: new FormControl(''),
      FaviconFileContent: new FormControl(''),

      MainBackgorundColor: new FormControl(''),
      MainTextColor: new FormControl(''),

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

  // handleFileInput(file:FileList){
  //   this.fileToUpload=file.item(0);

  //   var reader=new FileReader();
  //   reader.onload=(event:any)=>{
  //     this.imagesUrl=event.target.result;
  //   }

  //   reader.readAsDataURL(this.fileToUpload);



  // }




  handleFileInput(evt){

    this.showLogo=false;
this.showLogoChange=true;
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
        //this.imagesUrl=readerEvt.target.result;

            this.themeForm.patchValue({
              LogoFileContent: btoa(binaryString)
            })
            console.log(btoa(binaryString));
    }
    faviconFileInput(evt){

this.showFavicon=false;
this.showFaviconChange=true;
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._faviconFileInput.bind(this);
        reader.readAsBinaryString(file);
    }
  }


  _faviconFileInput(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textStringicon= btoa(binaryString);
       //this.imagesUrl=readerEvt.target.result;

           this.themeForm.patchValue({
            FaviconFileContent: btoa(binaryString)
           })
           console.log(btoa(binaryString));
   }
getcolor(){

  this.ThemeSettingservice.GetTheme().subscribe(res => {

    this.MainBackgorundColor=res.MainBackgorundColor;
    this.MainTextColor=res.MainTextColor;
    this.MainLabel=res.MainLabel;
    this.Logo=res.Logo;
    this.Favicon=res.Favicon;



    this.themeForm.patchValue({
      MainBackgorundColor: res.MainBackgorundColor,
      MainTextColor: res.MainTextColor,
      MainLabel: res.MainLabel,
      Logo:res.Logo,
      Favicon:res.Favicon,

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
    document.querySelector("body").style.cssText += `--MainBackgorundColor:${this.themeForm.get('MainBackgorundColor').value}`;
     document.querySelector("body").style.cssText += `--MainTextColor:${this.themeForm.get('MainTextColor').value}`;
    document.querySelector("body").style.cssText += `--MainLabel:${this.themeForm.get('MainLabel').value}`;
// this.themeForm.patchValue({
//   Logo:this.base64textString
// })
console.log('form value is', this.themeForm.value);
    this.ThemeSettingservice.PostTheme(this.themeForm.value).subscribe(res => { 
      this.getcolor();
      console.log('save res', res);

      this.Router.navigateByUrl("admin/theme", {skipLocationChange:true}).then(() => {
        this.Router.navigate([decodeURI(this.Location.path())]);
        
    });

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
