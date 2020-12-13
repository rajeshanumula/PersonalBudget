import React from 'react';
import {
  Link
} from "react-router-dom";
function Menu() {
  return (
    <div className="menu">
        <nav
        // role="Navigation"
        aria-label="Main menu"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        >
            <ul>
                <li><Link itemProp="url" to="/">Home</Link></li>
                <li><Link itemProp="url" to="./about">About</Link></li>
                <li><Link  itemProp="url" to="./login">Login</Link></li>
                <li><Link  itemProp="url" to="./register">Register</Link></li>
                
                <li><Link  id="logout" itemProp="url" to="./">.</Link></li>
                <li id="logout"><Link  itemProp="url" to="./">.</Link></li>
            </ul>
        </nav>
    </div>
  );
}

export default Menu ;