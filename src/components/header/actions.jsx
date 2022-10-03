import React, { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import cartImg from '../../images/svg/cart.svg'
import vector from '../../images/svg/vector.svg'
import vectorUp from '../../images/svg/vectorUp.svg'
import { withRouter } from '../../utils/hoc';
import MiniCart from './mini-cart';

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies{
        label
        symbol
      }
    }
`;

class Actions extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          renderCurrBox: false,
          renderMini: false,
        }
        this.currBox = React.createRef();
        this.renderChange = this.renderChange.bind(this)
        this.miniRenderChange = this.miniRenderChange.bind(this)
      }
    
      renderChange() {
        const check = this.state.renderCurrBox
        this.setState({
            renderCurrBox: check ? false: true
        })
        if (check) {
          document.removeEventListener("mousedown", this.handleClickOutside);
        } else {
          document.addEventListener("mousedown", this.handleClickOutside);
        }
      }

      miniRenderChange() {
        const check = this.state.renderMini
        this.props.changeRenderOverlay()
        this.setState({
            renderMini: check ? false: true
        })
      }

      handleChange(e) {
        const { name, value } = e.target
        this.props.changeCurrency(value, name)
        this.renderChange()
      }

      handleClickOutside = (e) => {
        if (this.currBox.current &&
          !this.currBox.current.contains(e.target)){
            this.renderChange();
          }
      }    

    render(){
      const { cart, itemsInCart, currencySymbol, currencyIdx } = this.props
    return <div className='actions'>
        <p className='action-item' onClick={this.renderChange}>{this.props.currencySymbol}</p>
        <img
        src={this.state.renderCurrBox
            ? vectorUp
            : vector}
        alt='arrow-down'
        className='currency-vector'/>
        {this.state.renderCurrBox &&
        <div className='currency-box' onChange={(e) => this.handleChange(e)} ref={this.currBox}>
            <Query
            query={GET_CURRENCIES}>
            {({ data }) => {
                if (data === undefined) return null;

                return data.currencies.map((currency, index) => (
                <div 
                key={currency.label}
                className={this.props.currencyIdx == index
                ? 'currency-button currency-checked'
                : 'currency-button'}>
                    <input 
                    type='radio'
                    name={currency.symbol}
                    value={index}
                    id={currency.label}
                    checked={this.props.currencyIdx == index}
                    ></input>
                    <label
                    className='currency-label'
                    for={currency.label}
                    >{currency.symbol} {currency.label}</label>
                </div>
                ))
            }}
            </Query>
            </div>}
            
            <img src={cartImg} id='cart' alt='cart' className='action-item' onClick={this.miniRenderChange}/>
            {this.props.itemsInCart != 0 && <div className='cart-items'>
              <p className='cart-num'>{itemsInCart}</p>
            </div>}
           {this.state.renderMini && <MiniCart
           miniRenderChange={this.miniRenderChange} 
           cart={this.props.cart} 
           currencyIdx={this.props.currencyIdx} 
           currencySymbol={this.props.currencySymbol}
           updateCart={this.props.updateCart}
           itemsInCart={this.props.itemsInCart} 
           changeQty={this.props.changeQty}/>}
        </div>
    }
}

export default Actions;