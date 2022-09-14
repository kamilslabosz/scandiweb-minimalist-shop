import { PureComponent } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Home from './pages/home';
import ProductQuery from './pages/product-query';



class App extends PureComponent {
  render() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductQuery />} />
      </Routes>
    </BrowserRouter>
    )
  };
};

export default App;