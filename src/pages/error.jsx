import { PureComponent } from 'react';
import { error404, errorHeaderInner } from '../utils/innerHtml';


class NotFound extends PureComponent{
  
render(){

  const { renderOverlay } = this.props

    return <div className='cat-main space-at-end'>
          {renderOverlay && <div className='dim-overlay'/>}
        <h1 className='cat-name'>{errorHeaderInner}</h1>
        <h1 className='cat-name'>{error404}</h1>
    </div>
    
    }
}

export default NotFound;