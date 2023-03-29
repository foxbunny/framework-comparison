import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { SavedProduct } from './entities'

interface ProductListResponse {
  data: Array<SavedProduct>,
  page: {
    current: number,
    total: number,
  },
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productList: SavedProduct[] = []
  currentPage = 1
  totalPages = 1

  constructor(private httpClient: HttpClient) { }

  fetchProducts({ page = 1 }) {
    return new Observable<number>(subscriber => {
      this.httpClient.get<ProductListResponse>('http://127.0.0.1:8000/products/', {
        responseType: 'json',
        params: { page },
      })
        .subscribe({
          next: data => {
            this.productList = data.data
            this.currentPage = data.page.current
            this.totalPages = data.page.total
            subscriber.next(0)
            subscriber.complete()
          },
          error: err => {
            subscriber.error(err.status)
            subscriber.complete()
          },
        })
    })
  }
}
