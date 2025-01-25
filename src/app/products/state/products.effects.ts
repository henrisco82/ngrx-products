import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { ProductActions, ProductsPageActions } from './products.actions';
import { catchError, concatMap, exhaustMap, mergeMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {

  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ProductActions.productsLoadedSuccess({ products })),
          catchError((error) => of(ProductActions.productsLoadedFail({ message: error })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({product}) =>
        this.productsService.add(product).pipe(
          map((newProduct) => ProductActions.productAddedSuccess({ product: newProduct })),
          catchError((error) => of(ProductActions.productAddedFail({ message: error })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({product}) =>
        this.productsService.update(product).pipe(
          map(() => ProductActions.productUpdatedSuccess({ product })),
          catchError((error) => of(ProductActions.productUpdatedFail({ message: error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductActions.productDeletedSuccess({ id })),
          catchError((error) => of(ProductActions.productDeletedFail({ message: error })))
        )
      )
    )
  );

  redirectToProductsPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.productAddedSuccess,
        ProductActions.productUpdatedSuccess,
        ProductActions.productDeletedSuccess
      ),
      tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false }
  );


  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router
  ) {}
}
