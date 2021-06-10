import axios from "axios";
//Action Types
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_REJECTED = "LOGIN_REJECTED";



//Action Creator
export const sendLogin = (query) => dispatch => {
    dispatch({
        type: LOGIN_PENDING,
        payload: ""
    });
    axios.post("/login", query)
        .then(res=>{
            dispatch({
                type: LOGIN_FULFILLED,
                payload: true
            });
            console.log({data: res.data});
        })
        .catch(err=>{
            dispatch({
                type: LOGIN_REJECTED,
                payload: err
            });
        });
};
