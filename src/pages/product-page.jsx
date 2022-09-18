import { PureComponent } from 'react';

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {...this.props.data.product},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...prevState,
      newItem:{
        ...prevState.newItem,
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
      e.preventDefault()
      const toCart = {...this.state.newItem}
      this.props.addToCart(toCart)
  }
  

  render() {

    const { name, inStock, gallery, description, attributes, brand, prices} = this.props.data.product

  return (
    <div className='product-page'>
    <div className='product-gallery'>
    {gallery.map((image) => (
        <img 
        src={image}
        alt={image}
        key={image}
        className='img-small'
        />
    ))}
    </div>
    <img 
    src={gallery[0]}
    className='product-current-img'
    />
    <div className='product-info'>
        <h1 className='brand-name'>{brand}</h1>
        <p className='product-page-name'>{name}</p>
        <form>
        {attributes.map((attr) => (
            <div className='attr-flex-box' onChange={this.handleChange}>
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
            ></input>
            <label className='attr-value' for={attr.name + item.value}>{item.value}</label>
            </div>))
            }
            </div>
        ))}
        <p className='product-price-tag'>Price:</p>
        <h1 className='product-page-price'>{prices[0].amount}</h1>
        {inStock
        ? <button type='submit' onClick={this.handleSubmit}>ADD TO CART</button>
        : <button className='grayed-bg' disabled>OUT OF STOCK</button>
        }
        </form>
        <div className='product-descriptcion' dangerouslySetInnerHTML={{__html: description}}></div>
    </div>
    </div>
    )
  };
};

export default ProductPage;