import React from 'react'
import {Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";


type PropsType = {
    text: string
    size: string
    color: string
    component: string
}
type StylePropsType = {
    size: string
    color: string
}


const useStyles = makeStyles((theme:Theme) => ({
    root: {
        fontFamily: "Permanent Marker",
        margin: theme.spacing(1, 0, 1,0),
        textAlign: 'center',
        fontSize:(props:StylePropsType) => props.size,
        color: (props:StylePropsType) => props.color,
        textShadow: '2px 2px gray',
    }
}))
export const MineTitle:React.FC<PropsType> = (props) => {
    const styles = useStyles(props)
    return (
        <Typography
            className={styles.root}
            // @ts-ignore
            component={props.component}
            variant="h5">
            {props.text}
        </Typography>
    )
}