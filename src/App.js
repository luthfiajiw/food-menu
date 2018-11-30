import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './menu/MainMenu';
import Deserts from './menu/Deserts';
import Beverages from './menu/Beverages';
import OpenMenu from './menu/OpenMenu';
import AddMenu from './menu/AddMenu';
import UpdateMenu from './menu/UpdateMenu';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1 className="text-center">MENU</h1>
          <ul className="nav justify-content-center text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link" >Main Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/desserts" className="nav-link">Desserts</Link>
            </li>
            <li className="nav-item">
              <Link to="/beverages" className="nav-link">Beverages</Link>
            </li>
          </ul>

          <Switch>
            <Route exact path="/" component={MainMenu}/>
            <Route path="/desserts" component={Deserts}/>
            <Route path="/beverages" component={Beverages}/>
            <Route path="/openmenu/:id" component={OpenMenu}/>
            <Route path="/addmenu" component={AddMenu}/>
            <Route path="/updatemenu/:id" component={UpdateMenu}/>
          </Switch>

          <footer className="text-center mt-5">
            <p>LAW &copy; 2018</p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
