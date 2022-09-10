import { PureComponent } from 'react';
import './App.css';
import Header from './components/header/header';
import MainPage from './components/main_page/main-page';


class App extends PureComponent {
  render() {
  return (
    <div>
      <Header />
      <MainPage />
    </div>)
  };
};

export default App;