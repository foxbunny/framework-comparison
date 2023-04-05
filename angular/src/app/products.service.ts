import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { catchError, of, tap, throwError } from 'rxjs'

import { SavedProduct } from './entities'
import { ToastsService } from './toasts.service'
import envinfo from './envinfo'

interface ProductListResponse {
  data: Array<SavedProduct>,
  page: {
    current: number,
    total: number,
  },
}

function createBlankResponse(): ProductListResponse {
  return {
    data: [],
    page: {
      current: 0,
      total: 0,
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productList: SavedProduct[] = []
  currentPage = 0
  totalPages = 0

  constructor(
    private httpClient: HttpClient,
    private toastsService: ToastsService,
  ) { }

  private handleUnauthorized() {
    this.toastsService.error('Your session has expired. Please log in and try again.')
  }

  getProductList({ page = 1 }) {
    return this.httpClient.get<ProductListResponse>(`${envinfo.API}/products/`, {
      responseType: 'json',
      withCredentials: true,
      params: { page },
    })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) this.handleUnauthorized()
          else {
            console.error(err.message)
            throwError(() => err)
          }
          return of(createBlankResponse())
        }),
        tap(data => {
          this.productList = data.data
          this.currentPage = data.page.current
          this.totalPages = data.page.total
        }),
      )
  }

  getProductById(id: number) {
    return this.productList.find(x => x.id === id)
  }
}
