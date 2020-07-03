import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private AuthService: AuthService, private Router: Router) { }

  registerForm: FormGroup;

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', Validators.required),
      UserRole: new FormControl('', Validators.required)
    })

  }

  register(){
    this.AuthService.registerUser(this.registerForm.value)
    .subscribe(
      res => {
        // localStorage.setItem('Token', res.Token)
        this.Router.navigate([''])
        console.log('regiter done')
      }
    )
  }

}
