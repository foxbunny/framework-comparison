import { Component } from '@angular/core';

import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = ''
  submitting = false

  constructor(private authService: AuthService) {}

  onSubmit({ username, password }: { username: string, password: string }) {
    this.submitting = true
    this.errorMessage = ''
    this.authService.logIn(username, password)
      .subscribe(error => {
        this.errorMessage = error
        this.submitting = false
      })
  }
}
