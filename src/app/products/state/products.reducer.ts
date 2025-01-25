import { createReducer, on } from '@ngrx/store';
import { ProductsPageActions, ProductActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

export const initialState: ProductState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state): ProductState => {
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  ),
  on(ProductsPageActions.loadProducts, (state): ProductState => {
      return {
        ...state,
        loading: true,
        errorMessage: '',
        products: [],
      };
    }),
  on(ProductActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(ProductActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    loading: false,
    products: [],
    errorMessage: message,
  })),
  on(ProductsPageActions.addProduct, (state): ProductState => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),
  on(ProductActions.productAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.updateProduct, (state): ProductState => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productUpdatedSuccess, (state, { product }) => ({
      ...state,
      loading: false,
      products: state.products.map(p => p.id === product.id ? product : p),
  })),
  on(ProductActions.productUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.deleteProduct, (state): ProductState => ({
      ...state,
      loading: true,
      errorMessage: '',
  })),
  on(ProductActions.productDeletedSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      products: state.products.filter(p => p.id !== id),
  })),
  on(ProductActions.productDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))

);
