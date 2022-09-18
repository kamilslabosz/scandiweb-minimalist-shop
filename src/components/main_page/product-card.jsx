import React, { PureComponent } from 'react';
import emptyCart from "../../images/svg/emptyCart.svg"
import { withRouter } from '../../utils/hoc';
class ProductCard extends PureComponent{
    constructor(props) {
        super(props);
      }

    toProductPage = () => this.props.navigate('/product/'+this.props.product.id)

    render(){

        const {name, gallery, inStock, prices, brand} = this.props.product
        return <div className='product-card'>
            <div className='img-box'
            onClick={this.toProductPage}
            >
            <img 
            src={gallery[0]} 
            alt={name}
            className={inStock ? "product-img" : "product-img img-grayed"}/>
            {inStock ? null : <h1 className='out-of-stock'>OUT OF STOCK</h1>}
            </div>
            <div 
            className={inStock ? 'cart-btn green-bg' : 'cart-btn grayed-bg'}
            onClick={inStock 
                ? () => {this.props.quickAddToCart(this.props.product)}
                : null}
            >
                <img src={emptyCart}
                alt='add-to-cart' 
                className='add-to-cart'
                />
            </div>
            <h1 
            onClick={this.toProductPage}
            className={inStock ? "product-name" : "product-name grayed"}>
                {brand} {name}
            </h1>
            <p 
            onClick={this.toProductPage}
            className={inStock ? "product-price" : "product-price grayed"}>
                {prices[0].amount}
            </p>
            
        </div>
        }
    }
    
    export default withRouter(ProductCard);