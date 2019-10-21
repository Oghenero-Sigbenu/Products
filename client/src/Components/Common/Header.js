import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faThLarge, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import './css/Header.css';
import { logout } from '../../store/actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: ''
    }
  }
  
  logout() {
    this.props.logout();
  }

  showMenu() {
    const nav = (
      <ul className="menu">
        <li className="hvr-pulse-grow"><a href="/login">Login</a></li>
        <li className="hvr-pulse-grow"><a href="/register">Register</a></li>
      </ul>
    );

    const userMenu = (
      <ul className="menu">
        <a href="/cart"><li className="hvr-pulse-grow"><FontAwesomeIcon icon={faShoppingCart} />Cart</li></a>
        <a href="/" onClick={() => this.logout()}><li className="hvr-pulse-grow"><FontAwesomeIcon icon={faSignOutAlt} />Logout</li></a>
      </ul>
    );

    return this.props.isLoggedIn ? userMenu : nav;
  }

  render() {

    const show = this.showMenu();
    return (
      <nav className={`header ${this.state.class}`}>
        <div className="logo">
          <a href="/"><h2>Watchy</h2></a>
        </div>
        {show}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps, { logout })(Header);
