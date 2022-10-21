import { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {...this.props.data.product},
      currImg: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.data.product.attributes.forEach(attr => {
      this.setState(prevState => ({
        newItem: {
          ...prevState.newItem,
          [attr.name]: '0',
        }
      }))
    });
   
  }

  handleChange(e, index) {
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

  const { gallery, inStock } = this.props.data.product
  const { renderOverlay } = this.props
  const { currImg } = this.state

  return (
    <div>
    {renderOverlay && <div className='dim-overlay'/>}
    <div className='product-page'>
    <div className='product-gallery'>
    {gallery.map((image, index) => (
        <img 
        src={image}
        alt='product'
        key={image}
        className='img-small'
        onClick={() => this.setState({currImg: index})}
        />
    ))}
    </div>
    <div className='flex'>
    <img 
    src={gallery[currImg]}
    alt='product'
    className={inStock ? 'product-current-img' : "product-current-img img-grayed"}
    />
    {inStock ? null : <h1 className='out-of-stock'>OUT OF STOCK</h1>}
    </div>
    <ProductInfo 
      currencyIdx={this.props.currencyIdx} 
      currencySymbol={this.props.currencySymbol} 
      product={this.props.data.product} 
      newItem={this.state.newItem}
      index={0}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      productPage={true}
      />
    </div>
    </div>
    )
  };
};

export default ProductPage;