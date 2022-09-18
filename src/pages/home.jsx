import React, { PureComponent } from 'react';
import MainPage from '../components/main_page/main-page';


class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.descrRef = React.createRef(); 
  }
  render() {
  return (
      <MainPage quickAddToCart={this.props.quickAddToCart}/>
    )
  };
};

export default Home;