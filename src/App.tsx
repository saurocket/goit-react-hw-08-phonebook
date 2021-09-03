import React, {useEffect} from 'react';

import {Header} from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {getAuth, getErrors, getRememberMe} from "./redux/authReducer/authSelectors/authSelectors";
import {Route, Switch, useHistory} from 'react-router-dom'
import {PresentationPage} from "./Components/PresentationPage/PresentationPage";
import Footer from "./Components/Footer/Footer";
import {Register} from "./Components/Register/Register";
import {Login} from "./Components/Login/Login";
import {MainPage} from "./Components/MainContactsPage/MainPage";
import {ProtectRouter} from "./Components/assets/Components/ProtectRoute";
import {actions} from "./redux/authReducer/authActions";




export const App = ()  => {
    const error = useSelector(getErrors)
    const auth = useSelector(getAuth)
    const rememberMe = useSelector(getRememberMe)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        const createAuthObject = async () => {
            let message = ''
            if (auth){
                message =  await JSON.stringify(auth)
            }
            if (rememberMe && auth){
                    localStorage.setItem('auth', message)
                return
            }
            const getAuthFromLS  = await localStorage.getItem('auth')
            if(!auth && getAuthFromLS){
                const authObject = await JSON.parse(getAuthFromLS)
                dispatch(actions.authUser(authObject))
                history.push(`${authObject.user.name}/contacts`)
                return
            }
            if(error?.includes('authenticate')){
                await localStorage.removeItem('auth')
                 await dispatch(actions.authUser(null))
                history.push('/')
            }
        }

        createAuthObject()
    },[auth, error])

  return (
      <>
            <Header/>
                <Switch>
                    <Route path='/' exact>
                        <PresentationPage/>
                    </Route>
                    <Route path='/register' exact>
                        <Register/>
                    </Route>
                    <Route path='/login' exact>
                        <Login/>
                    </Route>
                    <ProtectRouter path='/:user/contacts' component={MainPage} />
                </Switch>

        <Footer/>
      </>
  );
}