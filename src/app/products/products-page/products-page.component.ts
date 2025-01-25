import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsTotal, selectShowProductCode } from '../state/products.selectors';
import { ProductsStore } from '../state/products.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore]
})
export class ProductsPageComponent {
  // products$ = this.store.select(selectProducts);
  products$ = this.productsStore.product$;
  total = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  errorMessage = '';

  constructor(private store: Store, private productsStore: ProductsStore) {
    this.store.subscribe((state) => {
      console.log(state);
    });
  }

  ngOnInit(): void {
    this.productsStore.getProducts();
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
