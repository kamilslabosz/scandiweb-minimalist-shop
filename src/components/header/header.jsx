import { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components'
import logo from '../../images/svg/logo.svg'
import Actions from './actions';
import { withRouter } from '../../utils/hoc';
import { categoryBaseRoute, homeRoute } from '../../utils/routes';
import { logoAlt } from '../../utils/alts';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../utils/queries';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.goToCat = this.goToCat.bind(this);
    this.firstVisitCheck = this.firstVisitCheck.bind(this)
    this.onPop = this.onPop.bind(this);
  }

  goToCat(e, category){
    e.preventDefault()
    this.props.changeCategory(category)
    this.props.navigate(categoryBaseRoute+category)
  }

  onPop() {
    const popCat = window.location.pathname.split('/')
    const catRoute = categoryBaseRoute.split('/')
    if (popCat[popCat.length - 2] === catRoute[catRoute.length -2]) {
      this.props.changeCategory(popCat[popCat.length - 1])
    }
  }

  firstVisitCheck(data) {
    if (this.props.currencyIdx === null) {
      this.props.changeCurrency("0", data.currencies[0].symbol)
    }
  }
  
  componentDidMount() {
    window.addEventListener('popstate', this.onPop)
  }

    render(){

      const { currCategory } = this.props
      const path = window.location.pathname

    return <div className='header'>
              <div className='navigation'>
                <nav>
                <Query
                query={GET_CATEGORIES}>
                  {({ data }) => {
                    if (data === undefined) return null;
                    
                    if (path === homeRoute){
                      return data.categories.map(({ name }, index) => (
                        <a
                        className={index === 0
                        ? "category chosen-cat-div"
                        : "category"} 
                        key={name}
                        href={categoryBaseRoute+name}
                        onClick={(e) => this.goToCat(e, name)}>
                          <h1 
                          className={index === 0
                        ? "cat-label chosen-cat-label"
                        : "cat-label"} 
                          >{name}</h1>
                        </a>
                        ))
                    } else {
                      return data.categories.map(({ name }) => (
                        <a
                        className={name === currCategory
                        ? "category chosen-cat-div"
                        : "category"} 
                        key={name}
                        href={categoryBaseRoute+name}
                        onClick={(e) => this.goToCat(e, name)}>
                          <h1 
                          className={name === currCategory
                        ? "cat-label chosen-cat-label"
                        : "cat-label"} 
                          >{name}</h1>
                        </a>
                      ))
                    }
                  }}
                </Query>
                </nav>
              </div>
              <div className='brand-icon'>
                <img src={logo} id='logo'  alt={logoAlt}/>
              </div>
              <Query
                query={GET_CURRENCIES}
                onCompleted={data => this.firstVisitCheck(data)}>
                {({ data }) => { 

                  if (data === undefined) return null;

                  return (<Actions 
                  changeRenderOverlay={this.props.changeRenderOverlay}
                  cart={this.props.cart} 
                  itemsInCart={this.props.itemsInCart} 
                  changeCurrency={this.props.changeCurrency} 
                  currencyIdx={this.props.currencyIdx} 
                  currencySymbol={this.props.currencySymbol}
                  updateCart={this.props.updateCart} 
                  changeQty={this.props.changeQty}/>)
                            
                  }}
              </Query>
              
        </div>
    }
}

export default withRouter(Header);