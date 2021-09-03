import {Button, makeStyles} from "@material-ui/core";
import React from "react";


const useStyle = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(3, 0 ,2)
        }
    }
})

export const CancelButton = ({children, ...props}:any) => {
    const styles = useStyle();
    return <Button
        className={styles.root}

        fullWidth
        variant="contained"
        color="secondary"
        {...props}
    >
        {children}
    </Button>
}