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
        this.updateSummary = this.updateSummary.bind(this);
        this.goToCart = this.goToCart.bind(this);
      }

      updateSummary() { 
        const newTotal = this.props.cart.map((item) => (
            item.quantity * item.prices[this.props.currencyIdx].amount
        )).reduce((a, b) => a + b, 0)
        this.setState({
            total: (Math.round(newTotal * 100) / 100).toFixed(2)
        })
      }

      componentDidMount() {
        this.updateSummary()
      }

      componentDidUpdate() {
        this.updateSummary()
      }

      goToCart(e) {
        e.preventDefault();
        this.props.miniRenderChange()
        this.props.navigate("/cart")
      }

    render(){

      const { cart, itemsInCart, currencySymbol, currencyIdx, changeQty } = this.props
      const { total } = this.state

    return <div className='mini-cart-box'>
    <div className='row'>
    <h1 className='mini-cart-bold'>My Bag</h1>
    <h1 className='mini-cart-header'>, {itemsInCart} item{itemsInCart!==1 && 's'}</h1>
    </div>
    <div className='mini-cart-scroll'>
    {cart.map((product, index) => (
      <div className='mini-cart-product row' key={index}>
        <div className='column'>
        <h1 className='mini-cart-name'>{product.brand}</h1>
        <h1 className='mini-cart-name'>{product.name}</h1>
        <h1 className='mini-cart-price'>{currencySymbol}{product.prices[currencyIdx].amount}</h1>
        {product.attributes.map((attr) =>
          <div>
            <h1 className='mini-attr-name'>{attr.name}:</h1>
            <form className='row'>
            { attr.type === "swatch"
            ? attr.items.map((item, idx) => (
            <div key={index+attr.name + item.value}>
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
            : attr.items.map((item, idx) => (
            <div key={index+attr.name + item.value}>
            <input type="radio" 
                name={attr.name} 
                value={idx} 
                id={index+attr.name + item.value}
                checked={product[attr.name] == idx}
            ></input>
            <label 
            className={attr.name === 'Capacity'
              ? 'attr-value mini-cart-attr mini-attr-wider'
              : 'attr-value mini-cart-attr'} 
            for={index+attr.name + item.value}>{item.value}</label>
            </div>))
            }
            </form>
            
          </div>
    
        )}
        </div>
        <div className='flex align-center'>
                <div className='qty-box mini-cart-qty'>
                    <img src={plus} alt='plus' className='mini-qty-button' onClick={() => changeQty(product, 1)}/>
                    <h1 className='cart-qty'>{product.quantity}</h1>
                    <img src={minus} alt='minus' className='mini-qty-button' onClick={() => changeQty(product, -1)}/>
                </div>
                <img src={product.gallery[0]} alt={product.name} className='mini-cart-img' />
            </div>
      </div>))}
      </div>
    
    <div className='row mini-summary'>
    <h1 className='mini-cart-total'>Total: </h1>
    <h1 className='mini-cart-sum'>{currencySymbol}{total}</h1>
    </div>
    <div className='row mini-buttons'>
    <a href='/cart' onClick={(e) => this.goToCart(e)}><button className='mini-cart-btn mini-btn-white'>VIEW BAG</button></a>
    <button className='mini-cart-btn'>CHECKOUT</button>  
    </div>             
    </div>
    }
}

export default withRouter(MiniCart);

