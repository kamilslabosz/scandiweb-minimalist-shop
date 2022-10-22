import { PureComponent } from 'react';
import { withRouter } from '../../utils/hoc';
import { addToCartInner, outOfStockInner, priceInner } from '../../utils/innerHtml';
import { productBaseRoute } from '../../utils/routes';

class ProductInfo extends PureComponent {

    toProductPage = () => this.props.navigate(productBaseRoute+this.props.product.id)

    componentDidMount(){
        if (this.props.productPage){
            this.props.onMount(this.props.product)
            document.getElementById("product-description").innerHTML = this.props.product.description;
        }
    }

render(){

    const { name, inStock, attributes, brand, prices } = this.props.product
    const { currencySymbol, currencyIdx, index, productPage, newItem, handleChange, handleSubmit } = this.props

    return <div className='product-info'>
            <h1 className='brand-name'>{brand}</h1>
            <p className='product-page-name' 
            onClick={productPage ? null : this.toProductPage}>{name}</p>
            {productPage === false && <h1 className='product-page-price product-cart-price'>{currencySymbol}{prices[currencyIdx].amount.toFixed(2)}</h1>}
            <form>
            {attributes.map((attr) => (
                <div 
                    className='attr-flex-box' 
                    key={attr.name}
                    onChange={(e) => handleChange(e, index)}>
                <h1 
                key={attr.id}
                className='attr-name'
                >{attr.name}:</h1>
                { attr.type === "swatch"
                ? attr.items.map((item, idx) => (
                <div key={index+attr.name + item.value}>
                <input type="radio" 
                    name={attr.name} 
                    value={idx} 
                    id={index+attr.name + item.value}
                    defaultChecked={productPage 
                        ? idx === 0 || newItem[attr.name] === String(idx)
                        : newItem[attr.name] === String(idx) || newItem[attr.name] === idx}
                    disabled = {productPage ? false : true}
                ></input>
                <label 
                className={item.value === '#FFFFFF' 
                    ? 'attr-color-white'
                    : 'attr-color'} 
                    style={{background: item.value}} 
                    htmlFor={index+attr.name + item.value}></label>
                    </div>
                )) 
                : attr.items.map((item, idx) => (
                <div key={index+attr.name + item.value}>
                <input type="radio" 
                    name={attr.name} 
                    value={idx} 
                    id={index+attr.name + item.value}
                    defaultChecked={productPage 
                        ? idx === 0 || newItem[attr.name] === String(idx)
                        : newItem[attr.name] === String(idx) || newItem[attr.name] === idx}
                    disabled = {productPage ? false : true}
                ></input>
                <label className='attr-value' htmlFor={index+attr.name + item.value}>{item.value}</label>
                </div>))
                }
                </div>
            ))}
            {productPage && <p className='product-price-tag'>{priceInner}</p>}
            {productPage && <h1 className='product-page-price'>{currencySymbol}{prices[currencyIdx].amount.toFixed(2)}</h1>}
            {productPage && 
            (inStock
            ? <button type='submit' onClick={handleSubmit}>{addToCartInner}</button>
            : <button className='grayed-bg' disabled>{outOfStockInner}</button>)
            }
            </form>
            {productPage && <div id='product-description'></div>}
        </div>
    }
}

export default withRouter(ProductInfo);