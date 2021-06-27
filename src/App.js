import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Format2 from './pages/Format2';
import NotFound from './pages/NotFound';
const App = () => {
  return (
    <BrowserRouter>
    {/* englobe toute notre application, s'occupe de router*/}
      <Switch> 
      {/* tester toute les routes, et si toutes les routes ne sont pas bonnes il nous emmenera a erreur404 */}
        <Route path='/' exact component={Home}/>
        <Route path='/a-propos' exact component={About}/> 
        <Route path='/format-2' exact component={Format2}/> 
        {/* Determiner le chemin vers la page Home,si y'a pas exact tq il trouve / c'est que c'est bon*/}
        <Route component={NotFound}/>
        {/*Si le chemin n'existe pas il nous emmene ver notFound  */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
