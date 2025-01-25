import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';
import * as fromProducts from './products.reducer';

export const selectProductState = createFeatureSelector<fromProducts.ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  fromProducts.selectProducts
);

export const selectProductEntities = createSelector(
  selectProductState,
  fromProducts.selectProductEntities
);


export const selectProductsLoading = createSelector(
  selectProductState,
  (productState) => productState.loading
);

export const selectShowProductCode = createSelector(
  selectProductState,
  (productState) => productState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
  selectProductState,
  (productState) => productState.errorMessage
);

export const { selectRouteParams } = getRouterSelectors();


export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const selectProductById = createSelector(
  selectProductEntities,
  selectRouteParams,
  (productsEntities, { id }) => productsEntities[id]
);
