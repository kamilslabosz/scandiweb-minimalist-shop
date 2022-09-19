import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import { PureComponent } from 'react';
import { withRouter } from '../../utils/hoc';
import ProductPage from '../../pages/product-page';

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id){
      id
      name
      inStock
      gallery
      category
      description
      attributes{
        name
        id
        type
        items{
          displayValue
          value
          id
        }
      }
      brand
      prices{
        amount
      }
    }
  }
`;

class Product extends PureComponent {

  render() {
  return (
    <Query
    query={GET_PRODUCT}
    variables={{id: this.props.params.id}}>
      {({ data }) =>{
        if (data === undefined) return null;
        
        return <ProductPage  data={data} addToCart={this.props.addToCart}/>
      }}
    </Query>
    )
  };
};

export default withRouter(Product);