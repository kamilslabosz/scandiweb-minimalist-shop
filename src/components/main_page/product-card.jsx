import React, { PureComponent } from 'react';
import emptyCart from "../../images/svg/emptyCart.svg"
import { addToCartAlt } from '../../utils/alts';
import { withRouter } from '../../utils/hoc';
import { outOfStockInner } from '../../utils/innerHtml';
import { productBaseRoute } from '../../utils/routes';

class ProductCard extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            renderAnimation : false
        }
        this.addToCart = this.addToCart.bind(this)
      }

    toProductPage = () => this.props.navigate(productBaseRoute+this.props.product.id)


    addToCart(product) {
        this.setState({renderAnimation: true})
        this.props.quickAddToCart(product)
        setTimeout(() => this.setState({renderAnimation: false}), 100)
        
    }

    render(){
        const { product, currencySymbol, currencyIdx } = this.props
        const { id, name, gallery, inStock, prices, brand } = this.props.product
        const { renderAnimation } = this.state

        return <a className='product-card' href={productBaseRoute+id} onClick={(e) => e.preventDefault()}>
            <div className={renderAnimation
                ? 'img-box img-grayed'
                : 'img-box'}
                onClick={this.toProductPage}
            >
            <img 
            src={gallery[0]} 
            alt={name}
            className={inStock ? "product-img" : "product-img img-grayed"}/>
            {inStock ? null : <h1 className='out-of-stock'>{outOfStockInner}</h1>}
            </div>
            <div 
            className={inStock ? 'cart-btn green-bg' : 'cart-btn grayed-bg'}
            onClick={inStock 
                ? () => {this.addToCart(product)}
                : null}
            >
                <img src={emptyCart}
                alt={addToCartAlt} 
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
                {currencySymbol}{prices[currencyIdx].amount.toFixed(2)}
            </p>
            
        </a>
        }
    }
    
    export default withRouter(ProductCard);