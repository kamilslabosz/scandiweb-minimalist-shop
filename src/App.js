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
    this.addToCart = this.addToCart.bind(this);
    this.checkAndAdd = this.checkAndAdd.bind(this);
  }
  
  checkAndAdd(product) {
    const exist = this.state.cart.find((item) => item.id === product.id)

    if (exist) {
      const newCart = this.state.cart.map((x) => 
      x.id === product.id ? {...exist, quantity: exist.quantity + 1} : x
      );
      this.setState({
        cart: newCart,
        itemsInCart: this.state.itemsInCart + 1,
      })
    } else {
    product["quantity"] = 1;
    this.setState({
      cart: [...this.state.cart, product],
      itemsInCart: this.state.itemsInCart + 1,
    })
    }
 }

  quickAddToCart(product) {
    const newItem = {...product}
    newItem.attributes.forEach(attr => {
      newItem.id = newItem.id+attr.name+"0"
      newItem[attr.name] = 0
    });
    this.checkAndAdd(newItem)
  }

  addToCart(product) {
    product.attributes.forEach(attr => {
      product.id = product.id+attr.name+product[attr.name]
    })
    this.checkAndAdd(product)
  }

  render() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home quickAddToCart={this.quickAddToCart} />} />
        <Route path='/product/:id' element={<ProductQuery addToCart={this.addToCart} />} />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;