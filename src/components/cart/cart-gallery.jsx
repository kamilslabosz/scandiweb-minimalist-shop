import React, { PureComponent } from 'react';
import arrowLeft from '../../images/svg/arrowLeft.svg'
import arrowRight from '../../images/svg/arrowRight.svg'

class CartGallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          currImage: 0,
        }
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(direction){
        const newImg = this.state.currImage + (1 * direction)
        console.log(newImg);
        switch(newImg){
          case 0:
            this.setState({currImage: (this.props.gallery.length-1)})
            break;
          case this.props.gallery.length:
            this.setState({currImage: 0})
            break;
          default:
            this.setState({currImage: newImg})
        }
      }

    render() {
      const gallery = this.props.gallery
      return <div>
              <img className='cart-img' src={gallery[this.state.currImage]}/>
              <img src={arrowLeft} alt='PreviousImage' className='img-button arrow-left' onClick={() => this.handleChange(-1)}/>
              <img src={arrowRight} alt='NextImage' className='img-button arrow-right' onClick={() => this.handleChange(1)}/>
            </div>
    
  
    };
  };
  
  export default CartGallery;