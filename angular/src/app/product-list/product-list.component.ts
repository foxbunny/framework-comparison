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
}
