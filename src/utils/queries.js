import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies{
        label
        symbol
      }
    }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories{
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
query GetProducts($input: CategoryInput) {
  category(input: $input) {
      name
    products{
      id
      name
      inStock
      gallery
      category
      brand
      attributes{
        name
        type
        items{
          value
          id
        }
      }
      prices{
        amount
      }
    }
  }
}
`;

export const GET_PRODUCTS_MAIN = gql`
  query GetProducts {
    category{
      products{
        id
        name
        inStock
        gallery
        category
        brand
        attributes{
          name
          type
          items{
            displayValue
            value
            id
          }
        }
        prices{
          amount
        }
      }
    }
  }
`;

export const GET_ITEM = gql`
query GetProduct($id: String!) {
  product(id: $id){
    id
    name
    inStock
    gallery
    category
    description
    attributes{
      name
      id
      type
      items{
        displayValue
        value
        id
      }
    }
    brand
    prices{
      amount
    }
  }
}
`;

