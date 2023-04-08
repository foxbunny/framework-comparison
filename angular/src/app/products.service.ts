import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, of, tap, throwError } from 'rxjs'

import { Product, SavedProduct } from './entities'
import { ToastsService } from './toasts.service'
import envinfo from './envinfo'

interface ProductListParams {
  page: number
  order?: string
  dir?: string
  q?: string
}
interface ProductListResponse {
  data: Array<SavedProduct>
  page: {
    current: number
    total: number
  }
}

interface ProductPatchResponse {
  data: SavedProduct
}

function createBlankResponse(): ProductListResponse {
  return {
    data: [],
    page: {
      current: 0,
      total: 0,
    },
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

  getProductList({ page = 1, sortBy = '', sortAsc = true, search = '' }) {
    let params: ProductListParams = { page }
    if (sortBy) {
      params.order = sortBy
      params.dir = sortAsc ? 'asc' : 'desc'
    }
    if (search) params.q = search
    return this.httpClient.get<ProductListResponse>(`${envinfo.API}/products/`, {
      responseType: 'json',
      withCredentials: true,
      params: params as any,
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

  getEditorDataForProductById(productId: number): Product {
    let product = this.productList.find(x => x.id === productId)
    if (!product) return {
      name: '',
      description: '',
      sku: '',
      price: 0,
      stock: 0,
      unit: 'pc',
    }
    let { id, updated, ...editableProductData } = product
    return editableProductData
  }

  saveProduct(productId: number, updatedData: Product) {
    return this.httpClient.patch<ProductPatchResponse>(
      `${envinfo.API}/products/${encodeURIComponent(productId)}`,
      updatedData,
      {
        responseType: 'json',
        withCredentials: true,
      },
    )
      .pipe(
        catchError(err => {
          this.toastsService.error('The product was not updated due to a server error.')
          console.error(err)
          return of({ data: null })
        }),
        map(({ data }) => {
          if (data == null) return
          let index = this.productList.findIndex(x => x.id === productId)
          this.productList[index] = data
          return data
        }),
      )
  }
}
