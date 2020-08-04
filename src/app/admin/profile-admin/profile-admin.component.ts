import { AdminProfileDTO } from '../../models/admin/AdminProfile/AdminProfileDTO';
import { AdminProfileservice } from './../../services/admin/AdminProfile/AdminProfile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
profileinfo:any;
@ViewChild('closeModal') closeModal;
editFormEmail:FormGroup;
editFormPhone:FormGroup;
showBtnEdie=true;
showconfirmationCode=false;
showBtnEdieMobile=true;
showconfirmationCodeMobile=false;
maketrue=false;
maketrueEmail=false;
  subscription: Subscription;
  subscriptionb: Subscription;
  constructor(
    private AdminProfileservice:AdminProfileservice,
    public  translate: TranslateService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {

       // Translate Table (Ar & En)
       this.subscription = this.translate.onLangChange
       .subscribe((event: LangChangeEvent) => {
        if(event.lang == 'ar'){
      

         this.GetAdminProfile();
        }if (event.lang == 'en'){
   
         this.GetAdminProfile();

        }
       });
   
       this.GetAdminProfile();


       this.editFormEmail = new FormGroup({
        oldAlternativeMail:  new FormControl(''),
        newAlternativeMail:  new FormControl('',
        [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        isSms:  new FormControl(''),
        confirmationCode:  new FormControl(''),
    
      });
      this.editFormPhone = new FormGroup({
        oldMobile:  new FormControl(''),
        newMobile:  new FormControl('',Validators.required),
        isSms:  new FormControl(''),
        confirmationCode:  new FormControl(''),
    
      });
      
  }







  GetAdminProfile(){

    this.subscriptionb = this.AdminProfileservice.GetAdminProfile().subscribe(res =>
      {
this.profileinfo=res;
this.editFormEmail.patchValue({
  oldAlternativeMail: res.AlternativeEmail,
  isSms:false,
});

this.editFormPhone.patchValue({
  oldMobile: res.TelephoneNumber,
  isSms:true,
  
});

console.log(res)

      })

  }


  
  editEmail(){

    this.subscriptionb = this.AdminProfileservice.GetSmsOrMailConfCodeMObile(false).subscribe(res =>
      {

this.profileinfo=res;
this.GetAdminProfile();
this.showBtnEdie=false;
this.showconfirmationCode=true;
// this.editFormEmail.get('newAlternativeMail').disable();
this.maketrueEmail=true;
console.log('updated')

      })
      this.editFormEmail.get('confirmationCode').setValidators([Validators.required]);
     this.editFormEmail.get('confirmationCode').updateValueAndValidity();
     
  }

  SubmitconfirmationCode(){

    this.AdminProfileservice.PostprofileFacultyMember(this.editFormEmail.value).subscribe(res => {

      console.log('save res', res);
      this.GetAdminProfile();
    });
    this.showconfirmationCode=false;
    this.showBtnEdie=true;
    this.maketrueEmail=false;

    this.closeModal.nativeElement.click();
 

    this.editFormEmail.reset();

    // this.editFormEmail.resetForm();

    // this.editFormEmail.reset({
    //   newAlternativeMail: '',
     
    // });
 
  }

  editPhone(){

    this.subscriptionb = this.AdminProfileservice.GetSmsOrMailConfCodeMObile(true).subscribe(res =>
      {
this.profileinfo=res;
this.GetAdminProfile();

this.showBtnEdieMobile=false;
this.showconfirmationCodeMobile=true;
this.maketrue=true;

// this.editFormPhone.get('newMobile').disable();


console.log('updated')
      })
      
      this.editFormPhone.get('confirmationCode').setValidators([Validators.required]);
      this.editFormPhone.get('confirmationCode').updateValueAndValidity();

  }
  
  SubmitconfirmationCodePhone(){

    this.AdminProfileservice.PostprofileFacultyMember(this.editFormPhone.value).subscribe(res => {

      console.log('save res', res);
      this.GetAdminProfile();
    });
    this.showconfirmationCodeMobile=true;
    this.closeModal.nativeElement.click();
  }


}
