import React, { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainPage from './pages/main-page';
import CategoryPage from './pages/category-page';
import CartPage from './pages/cart';
import NotFound from './pages/error';
import ProductPage from './pages/product-page';
import { cartRoute, categoryBaseRoute, homeRoute, productBaseRoute } from './utils/routes';


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      cart: [],
      currCategory: null,
      currencyIdx: null,
      currencySymbol: '$',
      itemsInCart: 0,
      renderOverlay: false,
    }
    this.quickAddToCart = this.quickAddToCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkAndAdd = this.checkAndAdd.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.changeQty = this.changeQty.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this)
    this.changeRenderOverlay = this.changeRenderOverlay.bind(this)
  }

  setState(state) {
    const newState = {...this.state,
       ...state,
        renderOverlay: false
      }
    window.localStorage.setItem('state', JSON.stringify(newState));
    super.setState(state);
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
    this.checkAndAdd(newItem)
  }

  addToCart(product) {
    product.cartId = product.id
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

  changeCurrency(index, symbol){
    this.setState({
      currencyIdx: index,
      currencySymbol: symbol
    })
  }

  changeRenderOverlay() {
    const check = this.state.renderOverlay
    this.setState({
      renderOverlay: check ? false: true
    })
  }


  render() {
  return (
    <BrowserRouter>
      <Header 
        updateCart={this.updateCart} 
        changeQty={this.changeQty} 
        changeCategory={this.changeCategory} 
        changeCurrency={this.changeCurrency} 
        changeRenderOverlay={this.changeRenderOverlay}
        currCategory={this.state.currCategory} 
        currencyIdx={this.state.currencyIdx} 
        currencySymbol={this.state.currencySymbol} 
        cart={this.state.cart} 
        itemsInCart={this.state.itemsInCart}/>
      <Routes>
        <Route path='*' 
          element={<NotFound
            renderOverlay={this.state.renderOverlay}/>}/>
        <Route path={homeRoute} 
          element={<MainPage 
            renderOverlay={this.state.renderOverlay}
            currencySymbol={this.state.currencySymbol} 
            currencyIdx={this.state.currencyIdx} 
            quickAddToCart={this.quickAddToCart}/>} />
        <Route path={productBaseRoute+':id'} 
          element={<ProductPage 
            renderOverlay={this.state.renderOverlay}
            currencySymbol={this.state.currencySymbol} 
            currencyIdx={this.state.currencyIdx} 
            addToCart={this.addToCart} />} />
        <Route path={categoryBaseRoute+':name'} 
          element={<CategoryPage
            currCategory={this.state.currCategory}
            renderOverlay={this.state.renderOverlay}
            currencySymbol={this.state.currencySymbol} 
            currencyIdx={this.state.currencyIdx} 
            quickAddToCart={this.quickAddToCart} 
            changeCategory={this.changeCategory}/>} />
        <Route path={cartRoute} 
          element={<CartPage 
            renderOverlay={this.state.renderOverlay}
            currencySymbol={this.state.currencySymbol} 
            currencyIdx={this.state.currencyIdx} 
            cart={this.state.cart} 
            updateCart={this.updateCart} 
            changeQty={this.changeQty}/> } />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;