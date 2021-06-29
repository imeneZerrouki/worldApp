import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core';
const Countries = () => {
    /* stocker des donnees dans react avec 'states' les hooks de react */
    /* data nom de la variable, 
                        setNom l'element par lequel on passera pour actualiser cette données*/
    const[data,setData] = useState([]); /* state c'est tableau */
        /* on creer une requete on la stock dans une state notre data  */
    const [sortedData, setSortedData]=useState([]);
    const [playOnce, setPlayOnce]=useState(true);
    const [rangeData, setRangeData]= useState(40);
    const [selectedRadio, setSelectedRadio]= useState('');
    const radios=['Africa','America','Asia','Europe','Oceania'];
    const [checked, setChecked] = React.useState();
    const[searchTerm, setSearchTerm] = useState([]);
 
    useEffect(()=>{ /* fetcher la data une seule fois pas en boucle a l'infini*/
    if(playOnce){
    axios.get(
        'https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag'
        ).then((res)=> {
            setData(res.data)
            setPlayOnce(false)
        });
    }

    const sortedCountry = ()=>{
        const countryObj = Object.keys(data).map((i) => data[i]);
        const sortedArray = countryObj.sort((a,b)=>{
                    return b.population - a.population
                });
        sortedArray.length=rangeData;
        setSortedData(sortedArray);
    };
    sortedCountry();

    },[data,rangeData]); /* acolade c'est le callback*/
     
    return (
        <div className="countries">
            <div className='sort-container'>
                <input type='range' min='1' max='250' value={rangeData} 
                onChange={(e)=> {setRangeData(e.target.value);
                    }}/>
                
                {/* 
                <FormControlLabel
                    control={<Checkbox 
                    value='A'
                    onChange={(e)=> setChecked(e.target.value)} 
                     />}
                    label="Africa"
                />
                pour faire un check box : on peut faire comme radion boutton pour recup les valeur 
                et changer en bas .filter((country)=>country.region.includes(checked))
                */}

                <ul className='input-list'>
                    {radios.map((radio)=>{
                        return (
                            
                            <li className='inputLi' key={radio}>
                                <FormControlLabel 
                                value={radio}
                                control={<Radio 
                                    checked={radio === selectedRadio}
                                    onChange={(e)=> setSelectedRadio(e.target.value)}
                                    />} 
                                label={radio} />
    
                               
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='form'>
                <Button 
                onClick={()=> setSelectedRadio("")} 
                variant="contained" 
                color="secondary"
                size="large"
                
                style={{
                    fontSize: 15,
                    marginTop: 10,
                    left:'50%',
                    transform: 'translateX(-50%)'
                }}
                startIcon={<DeleteIcon/>}
                >
                    
                    <h5>Annuler la recherche</h5>
                </Button>
            </div>
            <ul className="countries-list">
                {sortedData
                .filter((country)=>country.region.includes(selectedRadio))/* il filtre chaque country
                et si jamais il includes une selected radio tu me le mets et derriere on se lance un map */
                .map((country) => (
                    <Card country={country} key={country.name}/>    
                ))}
            </ul>   
        </div>
    );
    /* le onClick sert a declencher l'evenement qui est la executer la fonction et afficher good bye */
};
                                                        
export default Countries;