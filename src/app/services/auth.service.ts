
import { RegisterDTO } from './../models/auth/RegisterDTO';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../models/auth/LoginDTO';

@Injectable()
export class AuthService {
///
  private _registerUrl = `${environment.baseUrl}Account/Register`;
  private _loginUrl = `${environment.baseUrl}Account/Login`;

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<LoginDTO>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.clear();
    this._router.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem('Token')
  }

  loggedIn() {
    return !!localStorage.getItem('Token')
  }
}

