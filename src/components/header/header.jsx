import React from 'react';
import { useQuery, gql } from '@apollo/client';
import logo from '../../images/svg/logo.svg'
import Actions from './actions';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories{
      name
    }
  }
`;

function Categories() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.categories.map(({ name }) => (
      <div className='category'>
        <h1 className='cat-label'>{name}</h1>
      </div>
  ));
}

class Header extends React.Component {
    render(){
    return <div className='header'>
            <div className='navigation'>
              <div className='all-categories'>
                <Categories />
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