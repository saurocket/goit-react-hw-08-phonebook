import React from "react";
import {Theme} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme:Theme )=> ({
        footerContainer: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            marginTop: 'auto',
            '& a':{
               textDecoration: 'none',
                fontFamily: "Permanent Marker",
            }
        },
    buttonsWrapper:{
            height: theme.spacing(8),
            textAlign: 'center'
    },



    })
)

const Footer = () => {
    const GIT_HUB = 'https://github.com/saurocket'
    const LINKEDIN = 'https://www.linkedin.com/in/yauheni-luzakou/'


    const classes = useStyles()
    const [value, setValue] = React.useState('')
    const handleChange =  (value: string) => {
            setValue(prevState => {
                if (prevState === value) return ''
                return value
            })

    }

    return (
        <footer className={classes.footerContainer}>
               <div className={classes.buttonsWrapper}>
                   {value && <div>
                       <a href={value}>{value}</a>
                   </div>
                   }
                   <IconButton
                    onClick={()=>handleChange(GIT_HUB)}
                   >
                       <GitHubIcon
                       color='primary'
                       fontSize='medium'
                       />
                   </IconButton>
                   <IconButton
                       onClick={()=>handleChange(LINKEDIN)}
                   >
                       <LinkedInIcon
                           fontSize='medium'
                           color='primary'
                       />
                   </IconButton>
               </div>
        </footer>
    )
}
export default Footer;



// <BottomNavigation
//     value={value}
//     onChange={handleChange}
// >
//     <BottomNavigationAction
//         label="https://github.com/saurocket"
//         value="https://github.com/saurocket"
//         icon={<GitHubIcon/>}
//     />
//     <BottomNavigationAction
//         label="https://www.linkedin.com/in/yauheni-luzakou/"
//         value="https://www.linkedin.com/in/yauheni-luzakou/"
//         icon={<LinkedInIcon/>}
//     />
// </BottomNavigation>