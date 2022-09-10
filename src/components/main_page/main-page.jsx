import { PureComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
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
          prices{
            amount
          }
        }
      }
    }
`;

function Products() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.category.products.map((product) => (
      <ProductCard product={product} />
    ));
  }

class MainPage extends PureComponent{
render(){
    return <div className='cat-main'>
        <h1 className='cat-name'>Category Name</h1>
        <Products />
    </div>
    
    }
}

export default MainPage;