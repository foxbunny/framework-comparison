import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, of } from 'rxjs'
import { Router } from '@angular/router'

import envinfo from './envinfo'

interface UsernameResponse {
  data: string
}
interface AuthResponse {
  data: 'ok'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ERRORS: { [code: number]: string } = {
    0: 'The server is currently unreachable.',
    403: 'Your username and password do not match. Please check your credentials.',
    500: 'The server failed to fulfill your request.',
    1000: 'You could not be logged in due to an unknown error.',
  }
  private DEFAULT_CODE = 9000
  username = ''

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  get isAuthenticated() {
    return this.username !== ''
  }

  getUsername() {
    this.httpClient.get<UsernameResponse>(`${envinfo.API}/sessions/`, {
      responseType: 'json',
      withCredentials: true,
    })
      .subscribe(data => {
        this.username = data.data
        if (!this.username) this.router.navigateByUrl('/login')
      })
  }

  logIn(username: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      `${envinfo.API}/sessions/`,
      { data: { username, password } },
      { responseType: 'json', withCredentials: true },
    )
      .pipe(
        catchError(err => {
          return of({ data: 'error', status: err.status })
        }),
        map(data => {
          if (data.data === 'error')
            return this.ERRORS[data.status] || this.ERRORS[this.DEFAULT_CODE]
          this.username = username
          this.router.navigateByUrl('/')
          return ''
        }),
      )
  }
}
