import React, { PureComponent } from 'react';
import arrowLeft from '../../images/svg/arrowLeft.svg'
import arrowRight from '../../images/svg/arrowRight.svg'
import { nextImage, previousImage } from '../../utils/alts';

class CartGallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          currImg: 0,
        }
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(direction){
        const newImg = this.state.currImg + (1 * direction)
        switch(newImg){
          case this.props.images.length:
            this.setState({currImg: 0})
            break;
          case -1:
            this.setState({currImg: (this.props.images.length-1)})
            break;
          default:
            this.setState({currImg: newImg})
        }
      }

      componentDidUpdate(prevProps){
        if (prevProps.product.id !== this.props.product.id){
          this.setState({currImg: 0})
        }
      }

    render() {

      const {images, product} = this.props
      const currImg = this.state.currImg

      return <div>
              <img className='cart-img' src={images[currImg]} alt={product.title}/>
              
              {images.length > 1 && <img src={arrowLeft} alt={previousImage} className='img-button arrow-left' onClick={() => this.handleChange(-1)}/>}
              {images.length > 1 && <img src={arrowRight} alt={nextImage} className='img-button arrow-right' onClick={() => this.handleChange(1)}/>}
            </div>
    
  
    };
  };
  
  export default CartGallery;