import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
      <h1 className='category'>{name}</h1>
  ));
}

class Header extends React.Component {
    render(){
    return <div className='header'>
            <div className='navigation'>
                <Categories />
            </div>
        </div>
    }
}

export default Header;