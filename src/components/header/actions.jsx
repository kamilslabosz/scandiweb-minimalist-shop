import { PureComponent } from 'react';
import cart from '../../images/svg/cart.svg'


class Actions extends PureComponent {
    render(){
    return <div className='actions'>
            <p className='action-item'>$ v</p>
            <img src={cart} id='cart' alt='cart' className='action-item'/>
        </div>
    }
}

export default Actions;