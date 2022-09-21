import { PureComponent } from 'react';
import ProductInfo from '../components/product-page/product-info';

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {...this.props.data.product},
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
    <ProductInfo 
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