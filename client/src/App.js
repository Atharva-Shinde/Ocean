import {Footer, Loader, Navbar, Services, Transactions, Welcome} from './components';

import './App.css';

const App =() => {
  return (
    <div className="App min-h-screen">
      <div className='gradient-bg-welcome'>
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  );
}

export default App;
