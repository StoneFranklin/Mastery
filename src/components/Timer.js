import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    button: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        '&.MuiButton-outlined': {
            outline: 'none',                                                                   
        }
    },
    saveButton: {
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
    },
    container: {
        borderRadius: 10,
        margin: 0,
        marginTop: 40,
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 1)',
    },
    clockText: {
        color: 'white'
    },
    icon: {
        fontSize: 40
    },
    saveIcon: {
        marginRight: 5
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#00e5ff'
        },
        secondary: {
            main: '#ff4081'
        }
    }
})

function Timer(props) {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.container}
                >
                    <Grid item xs={12} className={classes.clockText}>
                        <Typography variant="h2">
                            <span>{(props.hours < 10) ? `0${props.hours}` : props.hours}</span>:
                            <span>{(props.minutes < 10) ? `0${props.minutes}` : props.minutes}</span>:
                            <span>{(props.seconds < 10) ? `0${props.seconds}` : props.seconds}</span>
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        item
                        justify="center"
                        alignItems="center"
                        spacing={3}
                        >
                        <Grid item>
                            <Button 
                                onClick={props.start} 
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                            >
                                <PlayArrowIcon className={classes.icon}/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                onClick={props.pause} 
                                variant="outlined"
                                color="secondary"
                                className={classes.button}>
                                <PauseIcon className={classes.icon} />
                            </Button>
                        </Grid>   
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={props.reset} 
                            variant="outlined"
                            className={classes.saveButton}>
                            <SaveIcon className={classes.saveIcon}/>
                            Save Time
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default Timer;