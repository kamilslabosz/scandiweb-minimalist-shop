import React, { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Home from './pages/home';
import ProductQuery from './pages/product-query';



class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
      cart: [],
      currenncyIdx: 0,
      itemsInCart: 0,
    }
    this.quickAddToCart = this.quickAddToCart.bind(this);
  }
  
  quickAddToCart(product) {
    const newItem = {...product}
    newItem.attributes.forEach(attr => {
      newItem.id = newItem.id+attr.name+"0"
      newItem[attr.name] = 0
    });

    const exist = this.state.cart.find((item) => item.id === newItem.id)
    console.log(exist)
    if (exist) {
      const newCart = this.state.cart.map((x) => 
      x.id === newItem.id ? {...exist, quantity: exist.quantity + 1} : x
      );
      this.setState({
        cart: newCart,
        itemsInCart: this.state.itemsInCart + 1,
      })
    } else {
    newItem["quantity"] = 1;
    this.setState({
      cart: [...this.state.cart, newItem],
      itemsInCart: this.state.itemsInCart + 1,
    })
    }
  }

  render() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home quickAddToCart={this.quickAddToCart} />} />
        <Route path='/product/:id' element={<ProductQuery />} />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;