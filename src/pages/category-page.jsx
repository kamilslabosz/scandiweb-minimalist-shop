import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { withRouter } from '../utils/hoc';
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

class CategoryPage extends PureComponent {

  componentDidMount() {
    this.props.changeCategory(this.props.params.name)
  }

  render() {
    return <div className='cat-main'>
    <h1 className='cat-name'>{this.props.params.name}</h1>
    <Query
    query={GET_PRODUCTS}>
      {({ data }) => {
        if (data === undefined) return null;

        return data.category.products.filter(product => product.category === this.props.params.name).map((product) => (
          <ProductCard 
          product={product} 
          key={product.id} 
          quickAddToCart={this.props.quickAddToCart}
          />
        ))
      }}
    </Query>
</div>
  

  };
};

export default withRouter(CategoryPage);