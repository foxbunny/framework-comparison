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

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let params = this.route.snapshot.paramMap
    this.productsService.fetchProducts({ page: params.get('id') })
      .subscribe({
        next: () => {
          this.productList = this.productsService.productList
        },
        err: err => {
          if (err.status === 403) this.router.navigateByUrl('/login')
        },
      })
  }
}
