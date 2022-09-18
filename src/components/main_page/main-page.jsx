import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components'
import ProductCard from './product-card';

const GET_PRODUCTS = gql`
  query GetCategory {
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
    return <div className='cat-main'>
        <h1 className='cat-name'>Category Name</h1>
        <Query
        query={GET_PRODUCTS}>
          {({ data }) => {
            if (data === undefined) return null;

            return data.category.products.map((product) => (
              <ProductCard 
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