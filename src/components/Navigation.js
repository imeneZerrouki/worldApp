import React from 'react';
import { NavLink } from 'react-router-dom';
/* c'est des components aussi le NavLink */

const Navigation = () => {
    return (
        <div className="navigation"> 
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/format-2" activeClassName="nav-active">
                Deuxième format
            </NavLink>
            <NavLink exact to="a-propos" activeClassName="nav-active">
                A propos
            </NavLink>  
        </div>
    );
};

export default Navigation;