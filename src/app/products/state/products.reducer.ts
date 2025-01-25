import { createReducer, on } from '@ngrx/store';
import { ProductsPageActions, ProductActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

export const initialState: ProductState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
      ...state,
      showProductCode: !state.showProductCode,
    })
  ),
  on(ProductsPageActions.loadProducts, (state) => adapter.setAll([], {
      ...state,
      loading: true,
      errorMessage: '',
    })
  ),
  on(ProductActions.productsLoadedSuccess, (state, { products }) => adapter.setAll(products, {
    ...state,
    loading: false,
  })),
  on(ProductActions.productsLoadedFail, (state, { message }) => adapter.setAll([], {
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.addProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productAddedSuccess, (state, { product }) => adapter.addOne(product, {
    ...state,
    loading: false,
  })),
  on(ProductActions.productAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productUpdatedSuccess, (state, { update }) => adapter.updateOne(update, {
      ...state,
      loading: false,
  })),
  on(ProductActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productDeletedSuccess, (state, { id }) => adapter.removeOne(id, {
      ...state,
      loading: false,
  })),
  on(ProductActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))

);

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;
