import React from 'react';
import './food-component.css';
import logo from '../../logo.svg';

const FoodComponent = () => {
    return (
        <div>Food
            <img src={logo} className="food-img" alt="food" />
        </div>
    );
}

export default FoodComponent;