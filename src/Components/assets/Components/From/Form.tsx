import React from "react";
import {makeStyles} from "@material-ui/core";

type PropsType = {
    children?: any
    props?: any
    onSubmit: () => void
}


const useStyles = makeStyles((theme)=> {
    return {
        root: {
            width: '100%',
            marginTop: theme.spacing(1)
        }
    }
})

export const Form:React.FC<PropsType> = ({children, ...props}) => {
    const style = useStyles();
    return (
        <form
            className={style.root}
            noValidate
            {...props}
        >
            {children}
        </form>
    )
}