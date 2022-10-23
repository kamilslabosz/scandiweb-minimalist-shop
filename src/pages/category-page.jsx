import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { withRouter } from '../utils/hoc';
import ProductCard from '../components/main_page/product-card';
import { GET_PRODUCTS } from '../utils/queries'

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
    variables={{input: {title: this.props.params.name}}}
    fetchPolicy='network-only'>
      {({ data }) => {
        if (data === undefined) return null;
        
        return data.category.products.map((product) => (
          <ProductCard 
          currencyIdx={currencyIdx} 
          currencySymbol={currencySymbol} 
          product={product} 
          key={product.id} 
          quickAddToCart={quickAddToCart}
          />
        ))
        }
      }
    </Query>
</div>
  

  };
};

export default withRouter(CategoryPage);