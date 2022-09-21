import React, { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';
import { withRouter } from '../utils/hoc';
import minus from '../images/svg/minus.svg'
import plus from '../images/svg/plus.svg'
import arrowLeft from '../images/svg/arrowLeft.svg'
import arrowRight from '../images/svg/arrowRight.svg'

class CartPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          tax: 0,
          quantity: 0,
          total: 0,

        }
        // this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
      }



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
    <hr />
    <div className='cart-summary'>
        <div>
            <h1 className='sum-label'>Tax 21%:</h1>
            <h1 className='sum-label'>Quantity:</h1>
            <h1 className='sum-label'>Total:</h1>
        </div>
        <div>
            <h1 className='sum-value'>{this.state.tax}</h1>
            <h1 className='sum-value'>{this.state.quantity}</h1>
            <h1 className='sum-value'>{this.state.total}</h1>
        </div>
        <button type='submit' disabled>ORDER</button>
    </div>
    </div>
    </div>
    
  
    };
  };
  
  export default withRouter(CartPage);