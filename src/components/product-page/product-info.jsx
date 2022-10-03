import { PureComponent } from 'react';
import { withRouter } from '../../utils/hoc';

class ProductInfo extends PureComponent {

    toProductPage = () => this.props.navigate('/product/'+this.props.product.id)

render(){

    const { name, inStock, description, attributes, brand, prices } = this.props.product
    const { currencySymbol, currencyIdx, index, productPage, newItem, handleChange, handleSubmit } = this.props

    return <div className='product-info'>
            <h1 className='brand-name'>{brand}</h1>
            <p className='product-page-name' 
            onClick={productPage ? null : this.toProductPage}>{name}</p>
            {productPage === false && <h1 className='product-page-price product-cart-price'>{currencySymbol}{prices[currencyIdx].amount}</h1>}
            <form>
            {attributes.map((attr) => (
                <div className='attr-flex-box' onChange={(e) => handleChange(e, index)}>
                <h1 
                key={attr.id}
                className='attr-name'
                >{attr.name}:</h1>
                { attr.type === "swatch"
                ? attr.items.map((item, idx) => (
                <div>
                <input type="radio" 
                    name={attr.name} 
                    value={idx} 
                    id={index+attr.name + item.value}
                    checked={newItem[attr.name] == idx}
                ></input>
                <label 
                className={item.value === '#FFFFFF' 
                    ? 'attr-color-white'
                    : 'attr-color'} 
                    style={{background: item.value}} 
                    for={index+attr.name + item.value}></label>
                    </div>
                )) 
                : attr.items.map((item, idx) => (<div>
                <input type="radio" 
                    name={attr.name} 
                    value={idx} 
                    id={index+attr.name + item.value}
                    checked={newItem[attr.name] == idx}
                ></input>
                <label className='attr-value' for={index+attr.name + item.value}>{item.value}</label>
                </div>))
                }
                </div>
            ))}
            {productPage && <p className='product-price-tag'>Price:</p>}
            {productPage && <h1 className='product-page-price'>{currencySymbol}{prices[currencyIdx].amount}</h1>}
            {productPage && 
            (inStock
            ? <button type='submit' onClick={handleSubmit}>ADD TO CART</button>
            : <button className='grayed-bg' disabled>OUT OF STOCK</button>)
            }
            </form>
            {productPage && <div className='product-descriptcion' dangerouslySetInnerHTML={{__html: description}}></div>}
        </div>
    }
}

export default withRouter(ProductInfo);