import { profileFacultyMemberservice } from './../../services/FacultyMember/profileFacultyMember/profileFacultyMember.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'profile-faculty-member',
  templateUrl: './profile-faculty-member.component.html',
  styleUrls: ['./profile-faculty-member.component.css']
})
export class ProfileFacultyMemberComponent implements OnInit {
@ViewChild('closeModal1') closeModal1;
@ViewChild('closeModal2') closeModal2;


  profileinfo:any;

  editFormEmail:FormGroup;
  editFormPhone:FormGroup;
  subscription: Subscription;
  subscriptionb: Subscription;
  formBuilder: any;

  showBtnEdie=true;
  showconfirmationCode=false;

  showBtnEdieMobile=true;
showconfirmationCodeMobile=false;
maketrue=false;
maketrueEmail=false;

  constructor(
    private profileFacultyMemberservice:profileFacultyMemberservice,

    private titleService: Title,
    public  translate: TranslateService,
  ) { }

  ngOnInit(): void {

       // Translate Table (Ar & En)
       this.subscription = this.translate.onLangChange
       .subscribe((event: LangChangeEvent) => {
        if(event.lang == 'ar'){

         this.GetprofileFaculty();
      
        }if (event.lang == 'en'){
   
         this.GetprofileFaculty();

       

        }
       });
       this.GetprofileFaculty();



  

       this.editFormEmail = new FormGroup({
        oldAlternativeMail:  new FormControl(''),
        newAlternativeMail:  new FormControl('',  [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
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





  GetprofileFaculty(){

    this.subscriptionb = this.profileFacultyMemberservice.GetFacultymemberProfile().subscribe(res =>
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

    this.subscriptionb = this.profileFacultyMemberservice.GetSmsOrMailConfCodeMObile(false).subscribe(res =>
      {
this.profileinfo=res;
this.GetprofileFaculty();
this.showBtnEdie=false;
this.showconfirmationCode=true;

this.editFormEmail.get('newAlterantiveMail').disable();

console.log('updated')

      })
      this.editFormEmail.get('confirmationCode').setValidators([Validators.required]);
      this.editFormEmail.get('confirmationCode').updateValueAndValidity();
      
  }

  SubmitconfirmationCode(){

    this.profileFacultyMemberservice.PostprofileFacultyMember(this.editFormEmail.value).subscribe(res => {
      this.GetprofileFaculty();
      console.log('save res', res);
    });
    this.showconfirmationCode=true;
    this.closeModal1.nativeElement.click();
 

    this.editFormEmail.reset();
   
  }


  editPhone(){

    this.subscriptionb = this.profileFacultyMemberservice.GetSmsOrMailConfCodeMObile(true).subscribe(res =>
      {
this.profileinfo=res;
this.showBtnEdie=false;
this.showconfirmationCode=true;

this.showBtnEdieMobile=false;
this.showconfirmationCodeMobile=true;
this.maketrue=true;



console.log('updated')
this.GetprofileFaculty();
      })
      this.editFormPhone.get('confirmationCode').setValidators([Validators.required]);
      this.editFormPhone.get('confirmationCode').updateValueAndValidity();

  }

  SubmitconfirmationCodePhone(){

    this.profileFacultyMemberservice.PostprofileFacultyMember(this.editFormPhone.value).subscribe(res => {

      console.log('save res', res);
      this.GetprofileFaculty();
    });
    this.showconfirmationCode=true;
    this.showconfirmationCodeMobile=true;
  
    this.editFormPhone.reset();
    this.closeModal2.nativeElement.click();
  }

  
 
}
