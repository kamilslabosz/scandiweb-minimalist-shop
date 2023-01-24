import React, { PureComponent } from 'react';
import cartImg from '../../images/svg/cart.svg'
import MiniCart from './mini-cart';
import { cartAlt } from '../../utils/alts';

class Actions extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          renderCurrBox: false,
          renderMini: false,
        }
        this.currButtonRef = React.createRef();
        this.miniCartBox = React.createRef();
        this.cartButton = React.createRef();
        this.renderChange = this.renderChange.bind(this)
        this.miniRenderChange = this.miniRenderChange.bind(this)
      }
    
      renderChange() {
        const check = this.state.renderCurrBox
        this.setState({
            renderCurrBox: check ? false: true
        })
        if (check) {
          document.removeEventListener("mousedown", this.handleClickOutsideCurr);
        } else {
          document.addEventListener("mousedown", this.handleClickOutsideCurr);
        }
      }

      miniRenderChange() {
        const check = this.state.renderMini
        this.props.changeRenderOverlay()
        this.setState({
            renderMini: check ? false: true
        })
        if (check) {
          document.removeEventListener("mousedown", this.handleClickOutsideCart);
        } else {
          document.addEventListener("mousedown", this.handleClickOutsideCart);
        }
      }

      handleChange(e) {
        const { name, value } = e.target
        this.props.changeCurrency(value, name)
        this.renderChange()
      }

      handleClickOutsideCurr = (e) => {
        if (this.currBox.current &&
          !this.currBox.current.contains(e.target) &&
          !this.currButtonRef.current.contains(e.target)){
            this.renderChange();
          }
      }
      
      handleClickOutsideCart = (e) => {
        if (this.miniCartBox.current &&
          !this.miniCartBox.current.contains(e.target) &&
          !this.cartButton.current.contains(e.target)){
            this.miniRenderChange();
          }
      }  

    render(){

      const { itemsInCart } = this.props
      const { renderMini } = this.state

    return <div className='actions'>
            <div ref={this.cartButton} className='flex'><img src={cartImg} id='cart' alt={cartAlt} className='action-item' onClick={this.miniRenderChange}/>
            {itemsInCart !== 0 && <div className='cart-items' onClick={this.miniRenderChange}>
              <p className='cart-num'>{itemsInCart}</p>
            </div>}</div>
           {renderMini && <div 
              className='mini-cart-box'
              ref={this.miniCartBox}>
                <MiniCart
                  setref={this.miniCartBox}
                  miniRenderChange={this.miniRenderChange} 
                  cart={this.props.cart} 
                  currencyIdx={this.props.currencyIdx} 
                  currencySymbol={this.props.currencySymbol}
                  updateCart={this.props.updateCart}
                  itemsInCart={this.props.itemsInCart} 
                  changeQty={this.props.changeQty}/></div>}
                </div>
    }};

export default Actions;