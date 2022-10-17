import React, { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';
import { withRouter } from '../utils/hoc';
import minus from '../images/svg/minus.svg'
import plus from '../images/svg/plus.svg'
import CartGallery from '../components/cart/cart-gallery';

class CartPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          tax: 0,
          quantity: 0,
          total: 0,

        }
        this.updateSummary = this.updateSummary.bind(this);
      }

      updateSummary() { 
        const newTotal = this.props.cart.map((item) => (
            item.quantity * item.prices[this.props.currencyIdx].amount
        )).reduce((a, b) => a + b, 0)
        const newQty = this.props.cart.map((item) => (
            item.quantity
        )).reduce((a, b) => a + b, 0)
        const newTax = newTotal * 0.21
        this.setState({
            tax: (Math.round(newTax * 100) / 100).toFixed(2),
            quantity: (Math.round(newQty * 100) / 100),
            total: (Math.round(newTotal * 100) / 100).toFixed(2)
        })
      }

      componentDidMount() {
        this.updateSummary()
      }

      componentDidUpdate() {
        this.updateSummary()
      }

    render() {

      const { renderOverlay, cart, currencyIdx, currencySymbol, changeQty } = this.props
      const { tax, quantity, total } = this.state
      
      return <div>
      <div className='cat-main'>
      {renderOverlay && <div className='dim-overlay'/>}
      <h1 className='cat-name'>Cart</h1>
    </div>
    <div className='cart-all'>
        {cart.length === 0 && <h1>Cart is empty</h1>}
    {cart.map((product, index) => (
        <div className='cart-product' key={index}>
        <ProductInfo 
        currencyIdx={currencyIdx} 
        currencySymbol={currencySymbol} 
        product={product}
        newItem={product}
        index={index}
        handleChange={null}
        handleSubmit={null}
        productPage={false}
        />
        <div className='flex'>
            <div className='qty-box'>
                <img src={plus} alt='plus' className='qty-button' onClick={() => changeQty(product, 1)}/>
                <h1 className='cart-qty'>{product.quantity}</h1>
                <img src={minus} alt='minus' className='qty-button' onClick={() => changeQty(product, -1)}/>
            </div>
            <CartGallery gallery={product.gallery} product={product}/>
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
            <h1 className='sum-value'>{currencySymbol}{tax}</h1>
            <h1 className='sum-value'>{quantity}</h1>
            <h1 className='sum-value'>{currencySymbol}{total}</h1>
        </div>
        <button type='submit' disabled>ORDER</button>
    </div>
    </div>
    </div>
    
  
    };
  };
  
  export default withRouter(CartPage);