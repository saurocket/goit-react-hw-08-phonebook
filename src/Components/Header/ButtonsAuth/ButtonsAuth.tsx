import Button from "@material-ui/core/Button";

import React from "react";
import { useHistory } from "react-router-dom";


export const ButtonsAuth = () => {
    const history = useHistory()
    return  <div>
        <Button
            color="inherit"
            onClick={()=>history.push('/login')}
        >
            Sign in
        </Button>
        <Button
            color="inherit"
            variant='outlined'
            onClick={()=>history.push('/register')}
        >
            Sign up
        </Button>
    </div>
}