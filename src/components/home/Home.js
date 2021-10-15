import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid,AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts,getPostsBySearch } from '../../actions/posts';
import Posts from '../posts/Posts';
import Form from '../form/Form';
import Paginate from '../pagination/Paginate';
import useStyles from './styles';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const[search,setSearch]=useState('');
  const[tags,setTags]=useState([]);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');



  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };
  
  const handleKeyPress = (e)=>{
    if(e.keyCode===13){
      searchPost();
    }
  };

  const handleAdd = (tag)=>setTags([...tags,tag]);

  const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField 
              name="search"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <ChipInput
              style={{margin:'10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
            />
            <Button 
            className={classes.searchButton}
            onClick={searchPost}
             variant="contained" color="primary">Search</Button>
          </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) &&(
              <Paper className={classes.pagination} elevation={6}>
              <Paginate page={page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;