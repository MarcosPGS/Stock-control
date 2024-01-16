export interface IGetAllProductsResponse {
  id: string;
  name: string;
  amount: number;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  };
}

export interface IEventAction {
  action: string;
  id?: string;
}


export interface IDeleteProductAction {
  product_id: string;
  productName: string;
}


export interface IDeleteProductResponse {
  id: string;
  name: string;
  amount: number;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  };
}

export interface ICreateProductRequest {
  name: string;
  price: string;
  description: string;
  category_id: string;
  amount: number;
}

export interface ICreateProductResponse {
  name: string;
  price: string;
  description: string;
  category_id: string;
  amount: number;
}


export interface IEditProductRequest {
  name: string;
  price: string;
  description: string;
  product_id: string;
  amount: number;
  category_id: string;
}

export interface IEditProductResponse {
  name: string;
  price: string;
  description: string;
  product_id: string;
  amount: number;
}

