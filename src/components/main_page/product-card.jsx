import { PureComponent } from 'react';
import cart from "../../images/svg/cart.svg"
import emptyCart from "../../images/svg/emptyCart.svg"


class ProductCard extends PureComponent{

    render(){
        return <div className='product-card'>
            <div className='img-box'>
            <img 
            src={this.props.product.gallery[0]} 
            alt={this.props.product.name}
            className={this.props.product.inStock ? "product-img" : "product-img img-grayed"}/>
            {this.props.product.inStock ? null : <h1 className='out-of-stock'>OUT OF STOCK</h1>}
            </div>
            <div 
            className={this.props.product.inStock ? 'cart-btn green-bg' : 'cart-btn grayed-bg'}
            >
                <img src={emptyCart}
                alt='add-to-cart' 
                className='add-to-cart'
                />
            </div>
            <h1 className={this.props.product.inStock ? "product-name" : "product-name grayed"}>
                {this.props.product.name}
            </h1>
            <p className={this.props.product.inStock ? "product-price" : "product-price grayed"}>
                {this.props.product.prices[0].amount}
            </p>
            
        </div>
        }
    }
    
    export default ProductCard;