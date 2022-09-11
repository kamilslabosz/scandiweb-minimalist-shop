import { PureComponent } from 'react';
import cart from '../../images/svg/cart.svg'
import vector from '../../images/svg/vector.svg'


class Actions extends PureComponent {
    render(){
    return <div className='actions'>
            <p className='action-item'>$ <img
            src={vector} alt='arrow-down'/></p>
            <img src={cart} id='cart' alt='cart' className='action-item'/>
        </div>
    }
}

export default Actions;