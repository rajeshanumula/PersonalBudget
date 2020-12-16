import React from 'react';
import Logout from './Logout';
import {
    Link
} from "react-router-dom";
function MenuDashboard() {
    return (
        <div className="menudesign">
            <nav>
                <ul>
                    <li><Link itemProp="url" to="./dashboard">Dashboard</Link></li>
                    <li><Link itemProp="url" to="./addexpense">Add Expense</Link></li>
                    <li><Link itemProp="url" to="./editexpense">Edit Expense</Link></li>
                    <li><Link itemProp="url" to="./monthlybudget">Monthly Budget</Link></li>
                    <li><Link itemProp="url" to="./logout">Log out</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default MenuDashboard;