import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../CSS/CRUD.scss'
import '../CSS/allpages.scss'
//import 'bootstrap/dist/css/bootstrap.css';
const CRUDTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    axios.get("http://104.236.17.203:3001/listofcategories")
      .then(res => {
        setCategories(res.data.reverse());
      });
  };

  const deleteCategory = async category_id => {
    await axios.post(`http://104.236.17.203:3001/deleteexpense`, {
      category_id: category_id
    });
    loadCategories();
  };

  return (
    <div>
      <div className="container1">
        <table className="flat-table">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Month</th>
              <th>Category Name</th>
              <th>Budget($)</th>
              <th>Actions</th>
            </tr>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.month_name}</td>
                <td>{category.category_name}</td>
                <td>{category.budget}</td>
                <td><Link class="btn btn-primary mr-2" to={`editcategory/${category.category_id}`}>
                  Edit
                </Link>
                  <Link class="btn btn-danger" onClick={() => deleteCategory(category.category_id)}>
                    Delete
                  </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRUDTable;