
import React from 'react';

const Card2 = (props) => {
    const { country }= props;/* destructuring a la base props.country.name */

    const numberFormat = (x) =>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
return (
    <div className="card2">
        <img src={country.flag} alt="flag" />
        <div className="data-container">
            <ul>
                <li>{country.name}</li>
                <li>{country.capital}</li> 
                <li><br/></li> 
            </ul>     
        </div>
        <div className="population">{numberFormat(country.population)}
        <br/>
        <div className="habit">habitants</div></div>  
    </div>
);
};

export default Card2;