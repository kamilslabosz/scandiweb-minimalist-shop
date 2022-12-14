import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { withRouter } from '../utils/hoc'
import ProductInfo from '../components/product-page/product-info';
import { outOfStockInner } from '../utils/innerHtml';
import { GET_ITEM } from '../utils/queries';

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: {},
      currImg: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNewItem = this.setNewItem.bind(this)
  }

  setNewItem(product) {
    this.setState({newItem: {...product}})
    product.attributes.forEach(attr => {
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

  const { renderOverlay } = this.props
  const { currImg } = this.state

  return (
    <Query
    query={GET_ITEM}
    variables={{id: this.props.params.id}}>
      {({ data }) =>{
        if (data === undefined) return null;
        

        return (
          <div>
          {renderOverlay && <div className='dim-overlay'/>}
          <div className='product-page'>
          <div className='product-gallery'>
          {data.product.gallery.map((image, index) => (
              <img 
              src={image}
              alt={data.product.name}
              key={image}
              className='img-small'
              onClick={() => this.setState({currImg: index})}
              />
          ))}
          </div>
          <div className='flex'>
          <img 
          src={data.product.gallery[currImg]}
          alt={data.product.name}
          className={data.product.inStock ? 'product-current-img' : "product-current-img img-grayed"}
          />
          {data.product.inStock ? null : <h1 className='out-of-stock'>{outOfStockInner}</h1>}
          </div>
          <ProductInfo 
            currencyIdx={this.props.currencyIdx} 
            currencySymbol={this.props.currencySymbol} 
            product={data.product} 
            newItem={this.state.newItem}
            index={0}
            onMount={this.setNewItem}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            productPage={true}
            />
          </div>
          </div>
          )
      }}
    </Query>
    )
  };
};

export default withRouter(ProductPage);