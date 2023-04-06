import { Component, OnInit } from '@angular/core'

import { ProductsService } from '../products.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList = this.productsService.productList
  editedProductId = -1
  editorData = this.productsService.getEditorDataForProductById(this.editedProductId)

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    let params = this.route.snapshot.queryParams
    this.productsService.getProductList({ page: Number(params['page']) || 1 })
      .subscribe(() => {
        this.productList = this.productsService.productList
      })
  }

  onStartEditing(productId = -1) {
    this.editedProductId = productId
    this.editorData = this.productsService.getEditorDataForProductById(this.editedProductId)
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
}
