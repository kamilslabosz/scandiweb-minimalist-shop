import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import cart from '../../images/svg/cart.svg'
import vector from '../../images/svg/vector.svg'
import vectorUp from '../../images/svg/vectorUp.svg'
import { withRouter } from '../../utils/hoc';

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
        }
        this.renderChange = this.renderChange.bind(this)
      }
    
      renderChange() {
        const check = this.state.renderCurrBox
        this.setState({
            renderCurrBox: check ? false: true
        })
      }

      handleChange(e) {
        const { name, value } = e.target
        this.props.changeCurrency(value, name)
        this.renderChange()
      }

    render(){
    return <div className='actions'>
        <p className='action-item' onClick={this.renderChange}>{this.props.currencySymbol}</p>
        <img
        src={this.state.renderCurrBox
            ? vectorUp
            : vector}
        alt='arrow-down'
        className='currency-vector'/>
        {this.state.renderCurrBox &&
        <div className='currency-box' onChange={(e) => this.handleChange(e)}>
            <Query
            query={GET_CURRENCIES}>
            {({ data }) => {
                if (data === undefined) return null;

                return data.currencies.map((currency, index) => (
                <div className={this.props.currencyIdx == index
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
            
            <img src={cart} id='cart' alt='cart' className='action-item' onClick={() => this.props.navigate("/cart")}/>
        </div>
    }
}

export default withRouter(Actions);