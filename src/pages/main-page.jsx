import React, { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components'
import ProductCard from '../components/main_page/product-card';
import { mainPageHeader } from '../utils/innerHtml';
import { GET_PRODUCTS_MAIN } from '../utils/queries'

class MainPage extends PureComponent{
  
render(){

  const { renderOverlay, currencyIdx, currencySymbol,quickAddToCart } = this.props

    return <div className='cat-main space-at-end'>
          {renderOverlay && <div className='dim-overlay'/>}
        <h1 className='cat-name'>{mainPageHeader}</h1>
        <Query
        query={GET_PRODUCTS_MAIN}
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
          }}
        </Query>
    </div>
    
    }
}

export default MainPage;