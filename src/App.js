
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Favorites from './Components/Favorites/Favorites';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const dark = useSelector(state => state.dark);
  const style = {
    background: dark ? '#242132' : 'linear-gradient(250.26deg, #75489A -9.91%, rgba(80, 195, 210, 0.47) 57.79%, rgba(117, 72, 154, 0.4) 110.89%)'
  }
  return (
    <BrowserRouter>
      <div className="App" style={style}>
        <NavBar />
        <Route exact path="/Bar-Linder-12-08-2021">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
      </div>
    </BrowserRouter>

  );
}

export default App;
