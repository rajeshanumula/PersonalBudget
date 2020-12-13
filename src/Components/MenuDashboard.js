import React from 'react';
import Logout from './Logout';
import {
    Link
} from "react-router-dom";
function MenuDashboard() {
    return (
        <div className="menu">
            <nav
                // role="Navigation"
                aria-label="Main menu"
                itemScope
                itemType="https://schema.org/SiteNavigationElement">
                <ul>
                    <li><Link itemProp="url" to="./addexpense">Add Expense</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default MenuDashboard;