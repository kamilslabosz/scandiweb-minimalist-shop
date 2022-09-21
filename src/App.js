import React, { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainPage from './pages/main-page';
import CategoryPage from './pages/category-page';
import ProductQuery from './components/product-page/product-query';
import CartPage from './pages/cart';



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
    this.updateCart = this.updateCart.bind(this);
    this.changeQty = this.changeQty.bind(this);
  }
  
  checkAndAdd(product) {
    const exist = this.state.cart.find((item) => item.cartId === product.cartId)

    if (exist) {
      const newCart = this.state.cart.map((x) => 
      x.cartId === product.cartId ? {...exist, quantity: exist.quantity + 1} : x
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
    const newItem = {...product, 
      cartId: product.id
    }
    newItem.attributes.forEach(attr => {
      newItem.cartId = newItem.cartId+attr.name+"0"
      newItem[attr.name] = 0
    });
    this.checkAndAdd(newItem)
  }

  addToCart(product) {
    product.cartId = product.id
    product.attributes.forEach(attr => {
      product.cartId = product.cartId+attr.name+product[attr.name]
    })
    this.checkAndAdd(product)
  }

  updateCart(newCart) {
    this.setState({cart: newCart})
  }

  changeCategory(newCategory) {
    this.setState({
      currCategory: newCategory
    })
  }

  changeQty(product, n){
    const prod = this.state.cart.find((item) => item.cartId === product.cartId)
    const newCart = this.state.cart.map((x) => 
    x.cartId === product.cartId ? {...prod, quantity: prod.quantity + (1*n)} : x
    ).filter((item) => item.quantity > 0);
    this.setState({
      cart: newCart,
      itemsInCart: this.state.itemsInCart + (1*n),
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
        <Route path='/cart' element={<CartPage cart={this.state.cart} updateCart={this.updateCart} changeQty={this.changeQty}/> } />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;