import React from "react";
import {Container, makeStyles} from "@material-ui/core";


type MainContainerProps =  {
    children?: any,
    props?: any
}

const useStyles = makeStyles((theme) => {
    return{
        root: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    }
})


export const MainContainer:React.FC<MainContainerProps> = ({children, ...props}) => {

    const styles = useStyles()
    return <Container className={styles.root} maxWidth={"xs"} {...props}>
        {children}
        </Container>
}