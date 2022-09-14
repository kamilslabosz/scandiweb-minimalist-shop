import { PureComponent } from 'react';

class ProductPage extends PureComponent {

  render() {
    const { name, inStock, gallery, category, description, attributes, brand, prices} = this.props.data.product
  return (
    <div className='product-page'>
    <div className='product-gallery'>
    {gallery.map((image) => (
        <img 
        src={image}
        alt={image}
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
        {attributes.map((attr) => (
            <div className='attr-flex-box'>
            <h1 
            key={attr.id}
            className='attr-name'
            >{attr.name}:</h1>
            { attr.name === "Color"
            ? attr.items.map((item) => (<div className='attr-color' style={{background: item.value}}></div>)) 
            : attr.items.map((item) => (<h2 className='attr-value' >{item.value}</h2>))
            }
            </div>
        ))}
        <p className='product-price-tag'>Price:</p>
        <h1 className='product-page-price'>{prices[0].amount}</h1>
        <button>ADD TO CART</button>
        <div className='product-descriptcion' dangerouslySetInnerHTML={{__html: description}}></div>
    </div>
    </div>
    )
  };
};

export default ProductPage;