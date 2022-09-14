import { PureComponent } from 'react';
import emptyCart from "../../images/svg/emptyCart.svg"
import { withRouter } from '../../utils/hoc';
class ProductCard extends PureComponent{

    toProductPage = () => this.props.navigate('/product/'+this.props.product.id)
    toHome = () => this.props.navigate('/home')

    render(){
        return <div className='product-card'>
            <div className='img-box'
            onClick={this.toProductPage}
            >
            <img 
            src={this.props.product.gallery[0]} 
            alt={this.props.product.name}
            className={this.props.product.inStock ? "product-img" : "product-img img-grayed"}/>
            {this.props.product.inStock ? null : <h1 className='out-of-stock'>OUT OF STOCK</h1>}
            </div>
            <div 
            className={this.props.product.inStock ? 'cart-btn green-bg' : 'cart-btn grayed-bg'}
            onClick={this.toHome}
            >
                <img src={emptyCart}
                alt='add-to-cart' 
                className='add-to-cart'
                />
            </div>
            <h1 
            onClick={this.toProductPage}
            className={this.props.product.inStock ? "product-name" : "product-name grayed"}>
                {this.props.product.name}
            </h1>
            <p 
            onClick={this.toProductPage}
            className={this.props.product.inStock ? "product-price" : "product-price grayed"}>
                {this.props.product.prices[0].amount}
            </p>
            
        </div>
        }
    }
    
    export default withRouter(ProductCard);