import { PureComponent } from 'react';


class NotFound extends PureComponent{
  
render(){

  const { renderOverlay } = this.props

    return <div className='cat-main space-at-end'>
          {renderOverlay && <div className='dim-overlay'/>}
        <h1 className='cat-name'>Error</h1>
        <h1 className='cat-name'>Page not found</h1>
    </div>
    
    }
}

export default NotFound;