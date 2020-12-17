import React, { useState, useEffect } from "react";
import axios from "axios";
import '../CSS/LoginPage.scss'
import { useHistory, useParams } from "react-router-dom";


const EditCategory = () => {
    let history = useHistory();
    const { category_id } = useParams();
    const [category, setCategory] = useState({
        category_name: "",
        budget: ""
    });

    const { category_name, budget } = category;
    const onInputChange = e => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadCategory();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`  http://104.236.17.203:3001/updateexpense`, {
            budget: budget,
            category_id: category_id
        }).then((response) => {
            //console.log(response);
            window.location = "/dashboard";
        });
        // history.push("/dashboard");
    };
    
    const onSubmit1 = async e => {
        e.preventDefault();
        window.location = "/dashboard";
    };

    const loadCategory = async () => {

        const result = await axios.get("  http://104.236.17.203:3001/listofcategories/");
        for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].category_id == category_id) {
                setCategory(result.data[i]);
            }
        }
        setCategory(result.data);
    };
    return (
        <div className='body11'>
            <form onSubmit={e => onSubmit(e)} id="login-form1">
                <h1 id="login-head">Update Expense</h1>
                <div className="flex-row">
                    <input className='lf--input'
                        type="text"
                        disabled={true}
                        contentEditable="true"
                        placeholder="Enter Your CategoryName"
                        name="category_name"
                        value={category_name}
                        onChange={e => onInputChange(e)}></input>
                </div>
                <div className="flex-row">
                    <input className='lf--input'
                        type="number"
                        placeholder="Amount"
                        name="budget"
                        value={budget}
                        onChange={e => onInputChange(e)}
                    ></input>
                </div>
                <div className="flex-row1">
                    <input className='lf--submit' type='submit' value='Update Expense'></input>
                    <input className='lf--submit' type='submit' value='Cancel'></input>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;