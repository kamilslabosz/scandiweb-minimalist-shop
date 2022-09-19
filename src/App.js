import React, { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainPage from './pages/main-page';
import CategoryPage from './pages/category-page';
import ProductQuery from './components/product-page/product-query';



class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
      cart: [],
      currCategory: 'all',
      currenncyIdx: 0,
      itemsInCart: 0,
    }
    this.quickAddToCart = this.quickAddToCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkAndAdd = this.checkAndAdd.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
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

  changeCategory(newCategory) {
    this.setState({
      currCategory: newCategory
    })
  }

  render() {
  return (
    <BrowserRouter>
      <Header changeCategory={this.changeCategory} currCategory={this.state.currCategory}/>
      <Routes>
        <Route path='/' element={<MainPage quickAddToCart={this.quickAddToCart}/>} />
        <Route path='/product/:id' element={<ProductQuery addToCart={this.addToCart} />} />
        <Route path='/category/:name' element={<CategoryPage quickAddToCart={this.quickAddToCart} changeCategory={this.changeCategory}/>} />
        <Route path='/cart' element={<ProductQuery />} />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;