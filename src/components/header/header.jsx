import { PureComponent } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components'
import logo from '../../images/svg/logo.svg'
import Actions from './actions';
import { withRouter } from '../../utils/hoc';

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

    this.goToHome = this.goToHome.bind(this);
    this.goToCat = this.goToCat.bind(this)

  }

  goToHome(){
    this.props.changeCategory('all')
    this.props.navigate('/')
  }

  goToCat(category){
    this.props.changeCategory(category)
    this.props.navigate('/category/'+category)
  }

    render(){
    return <div className='header'>
              <div className='navigation'>
                <nav>
                <Query
                query={GET_CATEGORIES}>
                  {({ data }) => {
                    if (data === undefined) return null;

                    return data.categories.map(({ name }) => (
                      <div 
                      className={name === this.props.currCategory
                      ? "category chosen-cat-div"
                      : "category"} 
                      key={name}
                      onClick={name === 'all'
                      ? () => this.goToHome()
                      : () => this.goToCat(name)}>
                        <h1 
                        className={name === this.props.currCategory
                      ? "cat-label chosen-cat-label"
                      : "cat-label"} 
                        >{name}</h1>
                      </div>
                  ))
                  }}
                </Query>
                </nav>
              </div>
              <div className='brand-icon'>
                <img src={logo} id='logo'  alt='logo'/>
              </div>
              <Actions />
        </div>
    }
}

export default withRouter(Header);