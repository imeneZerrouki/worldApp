
import React from 'react';

const Card = (props) => {
    const { country }= props;/* destructuring a la base props.country.name */

    const numberFormat = (x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
return (
    <div className="card">
        <img src={country.flag} alt="flag" />
        <div className="data-container">
            <ul>
                <li>{country.name}</li>
                <li>Pop : {numberFormat(country.population)}</li>
                <li>{country.region}</li>  
                <li>{country.capital}</li> 
                <li><br/></li> 
            </ul>    
            
        </div>
    </div>
);
};

export default Card;