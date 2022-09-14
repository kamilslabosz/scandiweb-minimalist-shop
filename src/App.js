import { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Home from './pages/home';
import Product from './pages/product';



class App extends PureComponent {
  render() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;