import { PureComponent } from 'react';
import { withRouter } from '../../utils/hoc';
import plus from '../../images/svg/plus.svg'
import minus from '../../images/svg/minus.svg'

class MiniCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          total: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateSummary = this.updateSummary.bind(this);
        this.goToCart = this.goToCart.bind(this);
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
        this.setState({
            total: (Math.round(newTotal * 100) / 100)
        })
      }

      componentDidMount() {
        this.updateSummary()
      }

      componentDidUpdate() {
        this.updateSummary()
      }

      goToCart() {
        this.props.miniRenderChange()
        this.props.navigate("/cart")
      }

    render(){
      const { cart, itemsInCart, currencySymbol, currencyIdx } = this.props
    return <div className='mini-cart-box'>
    <div className='row'>
    <h1 className='mini-cart-bold'>My Bag</h1>
    <h1 className='mini-cart-header'>, {itemsInCart} items</h1>
    </div>
    {this.props.cart.map((product, index) => (
      <div className='mini-cart-product row' key={index}>
        <div className='column'>
        <h1 className='mini-cart-name'>{product.brand}</h1>
        <h1 className='mini-cart-name'>{product.name}</h1>
        <h1 className='mini-cart-price'>{currencySymbol}{product.prices[currencyIdx].amount}</h1>
        {product.attributes.map((attr) =>
          <div onChange={(e) => this.handleChange(e, index)}>
            <h1>{attr.name}:</h1>
            <form className='row'>
            { attr.type === "swatch"
            ? attr.items.map((item, idx) => (
            <div>
            <input type="radio" 
                name={attr.name} 
                value={idx} 
                id={index+attr.name + item.value}
                checked={product[attr.name] == idx}
            ></input>
            <label 
            className={item.value === '#FFFFFF' 
                ? 'mini-attr-white'
                : 'mini-attr-color'} 
                style={{background: item.value}} 
                for={index+attr.name + item.value}></label>
                </div>
            )) 
            : attr.items.map((item, idx) => (<div>
            <input type="radio" 
                name={attr.name} 
                value={idx} 
                id={index+attr.name + item.value}
                checked={product[attr.name] == idx}
            ></input>
            <label className='attr-value mini-cart-attr' for={index+attr.name + item.value}>{item.value}</label>
            </div>))
            }
            </form>
            
          </div>
    
        )}
        </div>
        <div className='flex align-center'>
                <div className='qty-box mini-cart-qty'>
                    <img src={plus} alt='plus' className='mini-qty-button' onClick={() => this.props.changeQty(product, 1)}/>
                    <h1 className='cart-qty'>{product.quantity}</h1>
                    <img src={minus} alt='minus' className='mini-qty-button' onClick={() => this.props.changeQty(product, -1)}/>
                </div>
                <img src={product.gallery[0]} alt={product.name} className='mini-cart-img' />
            </div>
      </div>))}
    
    <div className='row mini-summary'>
    <h1 className='mini-cart-total'>Total: </h1>
    <h1 className='mini-cart-sum'>{currencySymbol}{this.state.total}</h1>
    </div>
    <div className='row mini-buttons'>
    <button className='mini-cart-btn mini-btn-white' onClick={this.goToCart}>VIEW BAG</button>
    <button className='mini-cart-btn'>CHECKOUT</button>  
    </div>             
    </div>
    }
}

export default withRouter(MiniCart);

