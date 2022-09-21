import { PureComponent } from 'react';

class ProductInfo extends PureComponent {

render(){

    const { name, inStock, description, attributes, brand, prices } = this.props.product


    return <div className='product-info'>
            <h1 className='brand-name'>{brand}</h1>
            <p className='product-page-name'>{name}</p>
            {this.props.productPage === false && <h1 className='product-page-price product-cart-price'>{prices[0].amount}</h1>}
            <form>
            {attributes.map((attr) => (
                <div className='attr-flex-box' onChange={this.props.handleChange}>
                <h1 
                key={attr.id}
                className='attr-name'
                >{attr.name}:</h1>
                { attr.type === "swatch"
                ? attr.items.map((item, index) => (
                <div>
                <input type="radio" 
                    name={attr.name} 
                    value={index} 
                    id={attr.name + item.value}
                    checked={this.props.newItem[attr.name] == index}
                ></input>
                <label 
                className={item.value === '#FFFFFF' 
                    ? 'attr-color-white'
                    : 'attr-color'} style={{background: item.value}} for={attr.name + item.value}></label>
                    </div>
                )) 
                : attr.items.map((item, index) => (<div>
                <input type="radio" 
                    name={attr.name} 
                    value={index} 
                    id={attr.name + item.value}
                    checked={this.props.newItem[attr.name] == index}
                ></input>
                <label className='attr-value' for={attr.name + item.value}>{item.value}</label>
                </div>))
                }
                </div>
            ))}
            {this.props.productPage && <p className='product-price-tag'>Price:</p>}
            {this.props.productPage && <h1 className='product-page-price'>{prices[0].amount}</h1>}
            {this.props.productPage && 
            (inStock
            ? <button type='submit' onClick={this.props.handleSubmit}>ADD TO CART</button>
            : <button className='grayed-bg' disabled>OUT OF STOCK</button>)
            }
            </form>
            {this.props.productPage && <div className='product-descriptcion' dangerouslySetInnerHTML={{__html: description}}></div>}
        </div>
    }
}

export default ProductInfo;