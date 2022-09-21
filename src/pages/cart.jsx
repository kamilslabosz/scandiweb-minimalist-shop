import React, { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';
import { withRouter } from '../utils/hoc';
import minus from '../images/svg/minus.svg'
import plus from '../images/svg/plus.svg'
import arrowLeft from '../images/svg/arrowLeft.svg'
import arrowRight from '../images/svg/arrowRight.svg'

class CartPage extends PureComponent {

    render() {
      return <div>
      <div className='cat-main'>
      <h1 className='cat-name'>Cart</h1>
    </div>
    <div className='cart-all'>
    {this.props.cart.map((product, index) => (
        <div className='cart-product' key={index}>
        <ProductInfo 
        product={product}
        newItem={product}
        handleChange={null}
        handleSubmit={null}
        productPage={false}
        />
        <div className='flex'>
            <div className='qty-box'>
                <img src={plus} alt='plus' className='qty-button'/>
                <h1 className='cart-qty'>{product.quantity}</h1>
                <img src={minus} alt='minus' className='qty-button'/>
            </div>
            <img className='cart-img' src={product.gallery[0]}/>
            <img src={arrowLeft} alt='PreviousImage' className='img-button arrow-left'/>
            <img src={arrowRight} alt='NextImage' className='img-button arrow-right'/>
        </div>
        </div>
    ))}
    </div>
    </div>
    
  
    };
  };
  
  export default withRouter(CartPage);