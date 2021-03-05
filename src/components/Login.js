import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Copyright from './Copyright';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#212121'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    background: 'linear-gradient(45deg, #00e5ff, #ff4081)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '15px 30px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 1)',
    marginTop: '20px',
    marginBottom: '30px',
    '&.MuiButton-outlined': {
        outline: 'none',                                                                   
    },
    '&:hover': {
      color: 'white',
    }
  },
  fab: {
    marginRight: 5
  },
  rightSide: {
    backgroundColor: '#212121',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/micro-carbon.png")',
    color: 'white'
  },
  heading: {
    marginBottom: 40
  }
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.rightSide}>
        <div className={classes.paper}>
          <Typography variant="h4" className={classes.heading}>
            Mastery
          </Typography>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Button href="http://localhost:8080/auth/google" className={classes.button} >
                <i className={`fab fa-google ${classes.fab}`}></i>
                Sign In/Up
            </Button> 
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}