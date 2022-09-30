import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components'
import ProductCard from '../components/main_page/product-card';

const GET_PRODUCTS = gql`
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
          id
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

class MainPage extends PureComponent{
  
render(){
    return <div className='cat-main space-at-end'>
        <h1 className='cat-name'>all</h1>
        <Query
        query={GET_PRODUCTS}>
          {({ data }) => {
            if (data === undefined) return null;

            return data.category.products.map((product) => (
              <ProductCard 
              currencyIdx={this.props.currencyIdx} 
              currencySymbol={this.props.currencySymbol} 
              product={product} 
              key={product.id} 
              quickAddToCart={this.props.quickAddToCart}
              />
            ))
          }}
        </Query>
    </div>
    
    }
}

export default MainPage;