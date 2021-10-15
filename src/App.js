import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';

import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth';
import PostDetails from './components/postdetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

 return(
  <BrowserRouter>
  <Container maxWidth="xl">
    <Navbar />
    <Switch>
     <Route path="/auth" exact component={()=>(!user ? <Auth/> : <Redirect to="/posts"/>)}/>
      <Route path="/" exact component={()=><Redirect to="/posts"/>}/>
      <Route path="/posts" exact component={Home}/>
      <Route path="/posts/search" exact component={Home}/>
      <Route path="/posts/:id" exact component={PostDetails}/>
    </Switch>
  </Container>
</BrowserRouter>
 )
};

export default App;