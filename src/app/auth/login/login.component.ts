import { errorHandling } from 'src/app/globals';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentTermService } from 'src/app/services/admin/Term/current-term.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  showAlert: boolean = false;
  nameAr: string;
  errorMessage;

  constructor(private AuthService: AuthService, private Router: Router,
    private CurrentTermService: CurrentTermService) { }

  closeAlert() {
    this.showAlert = false;
  }
  currentTermCode
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    })
  

    this.CurrentTermService.GetAll().subscribe((res) =>{
      this.currentTermCode = res.TermCode;
      localStorage.setItem("dynamicTermCode", this.currentTermCode)
    })  
  }

  login(){
    this.AuthService.loginUser(this.loginForm.value)
    .subscribe(
      res => {
        localStorage.setItem('Token', res.Token);
        localStorage.setItem('UserName', res.UserName);
        localStorage.setItem('UserRole', res.UserRoles[0]);
        this.Router.navigate(['']);
      },
      err => {
        this.errorMessage = err.error.Message;
        errorHandling(err, this.Router.navigate(['']), this.showAlert = true);
      }
    )
  }

}
