import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (productState) => productState.products
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
  selectProducts,
  selectRouteParams,
  (products, { id }) => products.find((product) => product.id === parseInt(id))
);
