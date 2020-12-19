import React, { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/CRUD.scss'
import '../CSS/allpages.scss'
//import 'bootstrap/dist/css/bootstrap.css';
const CRUDTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    axios.get("http://104.236.17.203:3001/monthlybudget")
      .then(res => {
        setCategories(res.data);
      });
      //console.log(categories);
  };

  return (
    <div>
      <div className="container2">
        <table className="flat-table">
          <tbody>
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>List of Categories</th>
              <th>Total Budget($)</th>
            </tr>
            {categories.map((category, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{category.month_name}</td>
              <td>{category.category_name}</td>
              <td>{category.budget}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRUDTable;