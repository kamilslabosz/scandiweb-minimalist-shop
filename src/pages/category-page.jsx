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

class CategoryPage extends PureComponent {

  componentDidMount() {
    this.props.changeCategory(this.props.params.name)
  }

  render() {

    const { renderOverlay, params, currencyIdx, currencySymbol, quickAddToCart } = this.props

    return <div className='cat-main space-at-end'>
    {renderOverlay && <div className='dim-overlay'/>}
    <h1 className='cat-name'>{params.name}</h1>
    <Query
    query={GET_PRODUCTS}
    fetchPolicy='network-only'>
      {({ data }) => {
        if (data === undefined) return null;

        return data.category.products.filter(product => product.category === params.name).map((product) => (
          <ProductCard 
          currencyIdx={currencyIdx} 
          currencySymbol={currencySymbol} 
          product={product} 
          key={product.id} 
          quickAddToCart={quickAddToCart}
          />
        ))
      }}
    </Query>
</div>
  

  };
};

export default withRouter(CategoryPage);