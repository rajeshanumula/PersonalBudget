import React from 'react';
import '../CSS/Menu.scss'
import {
  Link
} from "react-router-dom";
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="menudesign">
        <nav>
          <ul>
            <li><Link itemProp="url" to="/">Home</Link></li>
            <li><Link itemProp="url" to="./login">Login</Link></li>
            <li><Link itemProp="url" to="./register">Register</Link></li>
            <li><Link itemProp="url" to="./about">About</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}