import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckBox from '@material-ui/core/Checkbox';
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, ThemeProvider,createMuiTheme } from '@material-ui/core';
const Countries = () => {
    /* stocker des donnees dans react 'states' les ouk de react */
   
    /* data nom de la variable, 
                        setNom l'element par lequel on passera pour actualiser cette données*/
    /*const sayGoodBye =() => {
        setData("Good Bye")
        a l'interieur du div 
        {data}
            <button onClick={sayGoodBye}> Dire au revoir</butto*/
    const[data,setData] = useState([]); /* state c'est tableau */
        /* on creer une requete on la stock dans une state notre data  */
    const [sortedData, setSortedData]=useState([]);
    const [playOnce, setPlayOnce]=useState(true);
    const [rangeData, setRangeData]= useState(40);
    const [selectedRadio, setSelectedRadio]= useState('');
    const radios=['Africa','America','Asia','Europe','Oceania'];
    const [checked, setChecked] = React.useState();
    const[searchTerm, setSearchTerm] = useState([]);

    const handleChange = (e) => {
      setChecked(e.target.checked);
    };
    const styles = makeStyles({
        root: {
            
        }
    })
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
     const searchOnChange = async(e)=>{
        setSearchTerm(e.target.value);
        const url ='https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag';
        
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson.results);
        setData(responseJson
            .filter(movie=>movie.name.toString().toLowerCase()
            .includes(searchTerm.toString().toLowerCase())));
        console.log(e.target.value);
        if (searchTerm==''){
            setSelectedRadio("");
        }
   
   
    
        };
    return (
        <div className="countries">
            <div className='sort-container'>
                <input type='range' min='1' max='250' value={rangeData} 
                onChange={(e)=> setRangeData(e.target.value)}/>
                <ul className='input-list'>
                    {radios.map((radio)=>{
                        return (
                            <li className='inputLi' key={radio}>
                                <input type='radio' value={radio} id={radio} checked={radio === selectedRadio}
                                onChange={(e)=> setSelectedRadio(e.target.value)}/>
                                <label htmlFor={radio}>{radio}</label>
                               
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='form'>
                <TextField 
                            id="outlined-basic" 
                            label="Search..." 
                            variant="outlined" 
                            color="secondary"
                            style={{
                                fontSize: 15,
                                marginTop: 10,
                                color: 'black'
                            }}
                            value={searchTerm}
                            onChange={searchOnChange}/>
                            <Button className={styles().root}
                onClick={()=> setSelectedRadio("")} 
                variant="contained" 
                color="secondary"
                size="large"
                
                style={{
                    fontSize: 15,
                    marginTop: 10,
                    /*left:'50%',
                    transform: 'translateX(-50%)'*/
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