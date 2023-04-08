import { Component, OnInit } from '@angular/core'

import { ProductsService } from '../products.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList = this.productsService.productList
  editedProductId = -1
  editorData = this.productsService.getEditorDataForProductById(this.editedProductId)
  page = 1
  sortBy = ''
  sortAsc = true
  search = ''

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.page = Number(params.get('page') || 1)
      this.updateProductList()
    })
  }

  updateProductList() {
    this.productsService.getProductList({
      page: this.page,
      sortBy: this.sortBy,
      sortAsc: this.sortAsc,
      search: this.search,
    })
      .subscribe(() => {
        this.productList = this.productsService.productList
      })
  }

  onStartEditing(productId = -1, control?: HTMLElement) {
    this.editedProductId = productId
    this.editorData = this.productsService.getEditorDataForProductById(this.editedProductId)
    requestAnimationFrame(() => control?.focus())
  }

  onCancel() {
    this.onStartEditing()
  }

  onConfirm() {
    this.productsService.saveProduct(this.editedProductId, this.editorData)
      .subscribe(result => {
        if (result) {
          this.onCancel()
          this.productList = this.productsService.productList
        }
      })
  }

  onToggleSort(column: string = '') {
    if (this.sortBy == column) this.sortAsc = !this.sortAsc
    else {
      this.sortBy = column
      this.sortAsc = true
    }
    this.updateProductList()
  }

  getColSort(column: string) {
    if (column !== this.sortBy) return ''
    return this.sortAsc ? 'ascending' : 'descending'
  }

  get lastPage() {
    return this.productsService.totalPages
  }

  get isFirstPage() {
    return this.page === 1
  }

  get isLastPage() {
    return this.page === this.lastPage
  }

  get previousPage() {
    return Math.max(1, this.page - 1)
  }

  get nextPage() {
    return Math.min(this.productsService.totalPages, this.page + 1)
  }

  onGoToPage(page: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: { page },
    })
  }
}
