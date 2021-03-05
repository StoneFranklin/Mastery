import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        color: '#757575',
        marginTop: 50
    },
    center: {
        textAlign: 'center',
        marginBottom: 30
    },
    top: {
        marginTop: 50
    },
    divider: {
        background: '#757575'
    }
})

function Footer() {
    const classes = useStyles()
    return (
        <Container maxWidth={"xl"} className={classes.top}>
        <Divider className={classes.divider} />
        <Container maxWidth="xs" className={classes.root}>
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item className={classes.center} xs={8}>
                    <Typography variant="caption" >
                        <em>
                            “Speak not of gifts, or innate talents! 
                            One can name all kinds of great men who were not very gifted. 
                            But they acquired greatness, became “geniuses”…”
                        </em>
                        ~ Friedrich Nietzsche
                    </Typography>
                </Grid>

                <Grid item>
                    <Copyright />
                </Grid>

            </Grid>
            
        </Container>
        </Container>
    );
}

export default Footer;