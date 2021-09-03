import React from "react";
import {useSelector} from "react-redux";
import { Route,Redirect } from "react-router-dom";
import {getAuth} from "../../../redux/authReducer/authSelectors/authSelectors";


type PropsType = {
    path: string,
    component: React.ComponentType
}





export const ProtectRouter:React.FC<PropsType> = ({...props}) => {
    const auth = useSelector(getAuth)

    if (auth){
        return <Route path={props.path} component={props.component}/>
    }


    return <Redirect to='/'/>


}