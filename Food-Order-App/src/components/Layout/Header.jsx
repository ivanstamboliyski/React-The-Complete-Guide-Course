import React from 'react';
import mealsImg from '../../image/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartBtn';

const Header = ({ onShowCart }) => {
    return (
        <>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="meals" />
            </div>
        </>
    );
};

export default Header;
