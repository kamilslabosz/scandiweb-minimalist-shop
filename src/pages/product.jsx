import { PureComponent } from 'react';
import { withRouter } from '../utils/hoc';

class Product extends PureComponent {

  render() {
  return (
        <h1>Product Page for {this.props.params.id}</h1>
    )
  };
};

export default withRouter(Product);