import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { catchError, of, tap, throwError } from 'rxjs'

import { SavedProduct } from './entities'

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
    private router: Router,
  ) { }

  private handleUnauthorized() {
    this.router.navigateByUrl('/login')
  }

  getProductList({ page = 1 }) {
    return this.httpClient.get<ProductListResponse>('http://127.0.0.1:8000/products/', {
      responseType: 'json',
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
}
