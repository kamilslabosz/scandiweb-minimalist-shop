import React, { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';
import { withRouter } from '../utils/hoc';
import minus from '../images/svg/minus.svg'
import plus from '../images/svg/plus.svg'
import CartGallery from '../components/cart/cart-gallery';
import { cartHeaderInner, emptyCartInner, orderInner, qtyInner, taxInner, totalInner } from '../utils/innerHtml';
import { qtyDown, qtyUp } from '../utils/alts';

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
            item.quantity * item.price
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
      <h1 className='cat-name'>{cartHeaderInner}</h1>
    </div>
    <div className='cart-all'>
        {cart.length === 0 && <h1>{emptyCartInner}</h1>}
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
                <img src={plus} alt={qtyUp} className='qty-button' onClick={() => changeQty(product, 1)}/>
                <h1 className='cart-qty'>{product.quantity}</h1>
                <img src={minus} alt={qtyDown} className='qty-button' onClick={() => changeQty(product, -1)}/>
            </div>
            <CartGallery images={product.images} product={product}/>
        </div>
        </div>
    ))}
    <hr />
    <div className='cart-summary'>
        <div>
            <h1 className='sum-label'>{taxInner}</h1>
            <h1 className='sum-label'>{qtyInner}</h1>
            <h1 className='sum-label'>{totalInner}</h1>
        </div>
        <div>
            <h1 className='sum-value'>{currencySymbol}{tax}</h1>
            <h1 className='sum-value'>{quantity}</h1>
            <h1 className='sum-value'>{currencySymbol}{total}</h1>
        </div>
        <button type='submit' disabled>{orderInner}</button>
    </div>
    </div>
    </div>
    
  
    };
  };
  
  export default withRouter(CartPage);