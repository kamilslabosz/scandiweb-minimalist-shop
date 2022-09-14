import { PureComponent } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components'
import logo from '../../images/svg/logo.svg'
import Actions from './actions';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories{
      name
    }
  }
`;

class Header extends PureComponent {
    render(){
    return <div className='header'>
              <div className='navigation'>
                <div className='all-categories'>
                <Query
                query={GET_CATEGORIES}>
                  {({ data }) => {
                    if (data === undefined) return null;

                    return data.categories.map(({ name }) => (
                      <div className='category'>
                        <h1 className='cat-label'>{name}</h1>
                      </div>
                  ))
                  }}
                </Query>
                </div>
              </div>
              <div className='brand-icon'>
                <img src={logo} id='logo'  alt='logo'/>
              </div>
              <Actions />
        </div>
    }
}

export default Header;