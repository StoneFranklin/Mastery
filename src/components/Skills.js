import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Footer from './Footer';

const useStyles = makeStyles({
    heading: {
        color: '#e0e0e0',
        paddingBottom: 20,
        paddingTop: 10
    },
    skill: {
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 1)',
        padding: 10,
        '&:hover': {
            boxShadow: '0 0 15px 7.5px rgba(0, 0, 0, 1)',
            transform: 'scale(1.025)'
        },
        marginTop: 10
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
            color: 'white'
        },
        color: 'white',
    },
    deleteIcon: {
        color: 'rgba(255, 64, 128, 0.8)',
        "&:hover": {
            color: 'rgba(255, 64, 128, 1)',
            transform: 'scale(1.125)'
        },
        marginLeft: 20
    },
    newSkillForm: {
        float: 'center'
    },
    skillsList: {
        paddingTop: 20
    },
    modalInput: {
        padding: '50px 30px',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 1)',
        position: 'fixed',
        top: '30%',
        width: 400
    },
    addIcon: {
        color: 'rgba(0, 229, 255, 0.8)',
        "&:hover": {
            color: 'rgba(0, 229, 255, 1)',
            transform: 'scale(1.025)'
        },
        fontSize: 40,
    },
    iconButton: { 
        "&:focus": {
            outline: 'none'
        }                                                                    
    },
    confirmDeleteModal: {
        padding: '30px 30px',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 1)',
        position: 'fixed',
        top: '30%',
    },
    outlinedButton: {
        background: 'rgba(0, 229, 255, 1)',
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '15px 20px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 1)',
        '&.MuiButton-outlined': {
            outline: 'none',                                                                   
        },
    },
})

function Skills(props) {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({
        name: "",
        totalSeconds: 0
    });
    const [loggedIn, setLoggedIn] = useState(true);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    const updateSkills = () => {
        console.log('update skills');
        axios.get('/api/skills', { withCredentials: true })
        .then(function(response) {
            if(response.data === false) {
                console.log(response.data);
                setLoggedIn(false);
            } else {
                setSkills(response.data);
            }
        })
        .catch(err => console.log(err));
    }
   
    useEffect(() => {
        updateSkills();
    }, []);

    const handleChange = (event) => {
        setNewSkill({
            name: event.target.value,
            totalSeconds: 0
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/skills', newSkill, { withCredentials: true })
            .then(function (response) {
                console.log('response data' + response.data);
                updateSkills();
            })
            .catch(function (error) {
                console.log(error);
            });
        setNewSkill({
            name: ""
        });
        handleClose();
    }

    const classes = useStyles();
        
    if(!loggedIn) {
        return <Redirect to="/login" />;
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenDelete = (id) => {
        setOpenDelete(true);
        setIdToDelete(id);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleDelete = (id) => {
        axios.delete(`/api/skills/${id}`, { withCredentials: true } )
            .then(res =>  {
                console.log(res);
                updateSkills();
                handleCloseDelete();
            })
            .catch(err => console.log(err))
    }

    const addSkillBody = (
        <form onSubmit={handleSubmit} >
            <Grid container justify="center" alignItems="center">
                <Grid 
                    item 
                    container 
                    xs={10}
                    sm={8}
                    md={6}
                    lg={4}
                    justify="center"
                    alignItems="center"
                    spacing={2}
                    className={classes.modalInput}
                >
                    <Grid item>
                        <TextField 
                            name="name" 
                            label="New Skill" 
                            type="text" 
                            variant="outlined"
                            value={newSkill.name} 
                            onChange={handleChange} 
                            required={true} 
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="outlined" className={classes.outlinedButton}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Grid>  
        </form>
    )

    const confirmDeleteBody = (
        <Grid container justify="center" alignItems="center" direction="column">
            <Grid 
                item
                container
                xs={10}
                sm={8}
                md={6}
                lg={4}
                justify="center"
                alignItems="center"
                direction="column"
                spacing={2}
                className={classes.confirmDeleteModal}>
                <Grid item>
                    <Typography variant="h6">Are you sure you want to delete this skill?</Typography>
                </Grid>
                <Grid item container justify="center" alignItems="center" spacing={1}>
                    <Grid item>
                        <Button 
                        onClick={() => handleDelete(idToDelete)} 
                        variant="outlined"
                        className={classes.outlinedButton}>Delete</Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleCloseDelete} variant="outlined" className={classes.outlinedButton}>Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
  
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {addSkillBody}
            </Modal>
            <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {confirmDeleteBody}
            </Modal>
            <Navbar />
            <Container maxWidth={'sm'} className={classes.root}>
                <Typography variant="h4" align="center" className={classes.heading}>
                    <em>SKILLS</em>
                </Typography>
                <Grid container justify="center">
                    <IconButton onClick={handleOpen} className={classes.iconButton}>
                        <AddCircleIcon className={classes.addIcon}/>
                    </IconButton>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    className={classes.skillsList}
                >
                    {skills.map(skill => {
                        return (
                            <Grid container alignItems="center" key={skill._id}>
                                <Grid item className={classes.skill} xs={11}>
                                    <Link 
                                        to={`/skills/${skill._id}`}
                                        className={classes.link}
                                    >
                                        <Grid item container direction="row" justify="space-between">
                                            <Grid item>
                                                <Typography variant="body1">{`${skill.name}`}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">{`${Math.floor(skill.totalSeconds / 3600)} Hours`}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton className={classes.iconButton} onClick={() => handleOpenDelete(skill._id)}>
                                        <DeleteIcon className={classes.deleteIcon}/>
                                    </IconButton>  
                                </Grid>
                            </Grid>                 
                        )
                    })}
                </Grid>
                
            </Container>   
            <Footer />    
        </>
    )
}

export default Skills;