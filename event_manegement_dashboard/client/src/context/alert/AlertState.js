import React , { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { 
    SET_ALERT,
    REMOVE_ALERT
 } from '../types';

 const AlertState = props => {
     
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg , type , timeout = 5000) => {
        const id = '';
        dispatch({
            type : SET_ALERT,
            payLoad : {msg , type , id}
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT , payLoad : id}), timeout);
    }

    return (
        <AlertContext.Provider
            value={{
                alerts : state,
                setAlert 
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
 }

 export default AlertState;