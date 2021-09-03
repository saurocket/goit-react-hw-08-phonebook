import React from 'react'
import {Container, Grid, Typography, Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {MineTitle} from "../assets/Components/MineTitle";
import Paper from '@material-ui/core/Paper';
import bgImage from '../assets/images/hero.jpg'
import {useSelector} from "react-redux";
import {getAuth} from "../../redux/authReducer/authSelectors/authSelectors";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    mainFeaturesPos: {
        position: "relative",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(0),
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: '80vh'
    },
    mainFeaturesPosContent: {
        position: "relative",
        padding: theme.spacing(6),
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: "rgba(0,0,0,0.3)"
    },
    descriptionBottom: {
        display: 'flex',
        justifyContent: 'space-between'
    },


}));
export const PresentationPage = () => {
    const history = useHistory()
    const auth = useSelector(getAuth)

    const classes = useStyles()
    return <section>
        <Paper className={classes.mainFeaturesPos}
               style={{backgroundImage: `url(${bgImage})`}}
        >
            <Container fixed>
                <div className={classes.overlay}/>
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.mainFeaturesPosContent}>
                            <MineTitle text='Phone Book' size='4rem' color='#29B6F6' component='h1'/>
                            <Typography variant='h3' component='p' align='center'>
                                This program is designed to store contacts
                            </Typography>
                            <Typography variant='h4' component='p' align='center'>
                                To feel the full power of the program, please register or log in to your account
                            </Typography>
                            {auth && <div style={{textAlign:'center', marginTop: '2rem'}}>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    onClick={()=> {history.push(`${auth?.user.name}/contacts`)}}
                                >
                                    Go To Contacts
                                </Button>
                            </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Paper>


    </section>


}

