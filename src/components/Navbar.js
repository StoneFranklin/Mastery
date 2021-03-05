import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: 'black',
    '&.MuiButton-outlined': {
      outline: 'none',                                                                   
    },
  },
  title: {
    flexGrow: 1,
  },
  
}));

const theme = createMuiTheme({
  palette: {
      primary: {
        main: 'rgba(0, 229, 255, 0.8)'
      },
      secondary: {
          main: '#ff4081'
      }
  }
})

function Navbar(props) {
  const classes = useStyles();
  const[logoutClicked, setLogoutClicked] = useState(false);

  const logout = () => {
    axios.get('/api/logout', { withCredentials: true })
    .then(res => {
      console.log(res);  
      setLogoutClicked(true);
    })
    .catch(err => console.log(err))
  }

  if(logoutClicked) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Link to="/skills">
              <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Mastery
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default Navbar;