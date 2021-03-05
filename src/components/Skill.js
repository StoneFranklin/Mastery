import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStopwatch } from 'react-timer-hook';
import Timer from './Timer';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

import Grid from '@material-ui/core/Grid';
import Footer from './Footer';


const useStyles = makeStyles({
    root: {
        color: "white",
        marginTop: 30
    }
})

function Skill(props) {
    const [name, setName] = useState("");
    const [totalSeconds, setSeconds] = useState("");
    const [loggedIn, setLoggedIn] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/skills/${id}`, { withCredentials: true })
        .then(res => {
            if(res.data === false) {
                console.log(res.data);
                setLoggedIn(false);
            } else {
                setName(res.data.name)
                setSeconds(res.data.totalSeconds)
            }           
        })
        .catch(err => console.log(err))
    }, []);

    const {
        seconds,
        minutes,
        hours,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    function saveTime() {
        reset();
        const newSeconds = seconds + (minutes * 60) + (hours * 3600);
        setSeconds(newSeconds + totalSeconds);
        axios.patch('/api/skill', { id: id, newSeconds: totalSeconds + newSeconds }, { withCredentials: true })
            .catch(err => console.log(err))
    }

    const generateTime = () => {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        let seconds = totalSeconds - ((hours * 3600) + (minutes * 60));

        if(hours < 10) {
            hours = `0${hours}`
        }

        if(minutes < 10) {
            minutes = `0${minutes}`
        }

        if(seconds < 10) {
            seconds = `0${seconds}`
        }

        return `${hours}:${minutes}:${seconds}`
    }
    
    const classes = useStyles();

    if(!loggedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <Navbar />
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h2" className={classes.root}>
                        {name}
                    </Typography>
                    <Typography variant="h5" className={classes.root}>
                        Total Time Spent: {generateTime()}
                    </Typography>
                    <Timer 
                        seconds={seconds}
                        minutes={minutes}
                        hours={hours}
                        start={start}
                        pause={pause}
                        reset={saveTime}
                    />
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Skill;