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

  const { gallery } = this.props.data.product

  return (
    <div className='product-page'>
    <div className='product-gallery'>
    {gallery.map((image, index) => (
        <img 
        src={image}
        alt='Photo-of-product'
        key={image}
        className='img-small'
        onClick={() => this.setState({currImg: index})}
        />
    ))}
    </div>
    <img 
    src={gallery[this.state.currImg]}
    className='product-current-img'
    />
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
    )
  };
};

export default ProductPage;