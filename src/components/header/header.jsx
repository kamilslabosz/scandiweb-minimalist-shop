import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components'
import logo from '../../images/svg/logo.svg'
import Actions from './actions';
import { withRouter } from '../../utils/hoc';
import { categoryBaseRoute } from '../../utils/routes';
import { logoAlt } from '../../utils/alts';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories{
      name
    }
  }
`;

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.goToCat = this.goToCat.bind(this)
  }

  goToCat(e, category){
    e.preventDefault()
    this.props.changeCategory(category)
    this.props.navigate(categoryBaseRoute+category)
  }

    render(){
      const { currCategory } = this.props
    return <div className='header'>
              <div className='navigation'>
                <nav>
                <Query
                query={GET_CATEGORIES}>
                  {({ data }) => {
                    if (data === undefined) return null;

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
                  }}
                </Query>
                </nav>
              </div>
              <div className='brand-icon'>
                <img src={logo} id='logo'  alt={logoAlt}/>
              </div>
              <Actions 
              changeRenderOverlay={this.props.changeRenderOverlay}
              cart={this.props.cart} 
              itemsInCart={this.props.itemsInCart} 
              changeCurrency={this.props.changeCurrency} 
              currencyIdx={this.props.currencyIdx} 
              currencySymbol={this.props.currencySymbol}
              updateCart={this.props.updateCart} 
              changeQty={this.props.changeQty}/>
        </div>
    }
}

export default withRouter(Header);