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
        this.handleChange = this.handleChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
      }

      handleChange(e, index) {
        const { value, name } = e.target
        let cart = [...this.props.cart]
        let product = {
            ...cart[index],
            [name]: value,
            cartId: cart[index].id,
        }
        product.attributes.forEach(attr => {
            product.cartId = product.cartId+attr.name+product[attr.name]
          })
        cart[index] = product
        console.log('name: '+name+' value: '+value+' index: '+index);
        this.props.updateCart(cart);
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
            tax: (Math.round(newTax * 100) / 100),
            quantity: (Math.round(newQty * 100) / 100),
            total: (Math.round(newTotal * 100) / 100)
        })
      }

      componentDidMount() {
        this.updateSummary()
      }

      componentDidUpdate() {
        this.updateSummary()
      }

    render() {
      return <div>
      <div className='cat-main'>
      {this.props.renderOverlay && <div className='dim-overlay'/>}
      <h1 className='cat-name'>Cart</h1>
    </div>
    <div className='cart-all'>
        {this.props.cart.length === 0 && <h1>Cart is empty</h1>}
    {this.props.cart.map((product, index) => (
        <div className='cart-product' key={index}>
        <ProductInfo 
        currencyIdx={this.props.currencyIdx} 
        currencySymbol={this.props.currencySymbol} 
        product={product}
        newItem={product}
        index={index}
        handleChange={this.handleChange}
        handleSubmit={null}
        productPage={false}
        />
        <div className='flex'>
            <div className='qty-box'>
                <img src={plus} alt='plus' className='qty-button' onClick={() => this.props.changeQty(product, 1)}/>
                <h1 className='cart-qty'>{product.quantity}</h1>
                <img src={minus} alt='minus' className='qty-button' onClick={() => this.props.changeQty(product, -1)}/>
            </div>
            <CartGallery gallery={product.gallery}/>
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
            <h1 className='sum-value'>{this.props.currencySymbol}{this.state.tax}</h1>
            <h1 className='sum-value'>{this.state.quantity}</h1>
            <h1 className='sum-value'>{this.props.currencySymbol}{this.state.total}</h1>
        </div>
        <button type='submit' disabled>ORDER</button>
    </div>
    </div>
    </div>
    
  
    };
  };
  
  export default withRouter(CartPage);