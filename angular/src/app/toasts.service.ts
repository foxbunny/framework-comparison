import { Injectable } from '@angular/core';

type ToastType = 'error' | 'notice'

interface Toast {
  type: ToastType
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  static TIMEOUT = 10_000

  toast: Toast | null = null

  constructor() { }

  private setToast(type: ToastType, message: string) {
    this.toast = { type, message }
    setTimeout(() => {
      this.toast = null
    }, ToastsService.TIMEOUT)
  }

  error(message: string) {
    this.setToast('error', message)
  }

  notice(message: string) {
    this.setToast('notice', message)
  }
}
