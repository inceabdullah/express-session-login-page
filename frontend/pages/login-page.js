import styles from '../styles/Login.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {connect} from "react-redux";
import actions from '../redux/actions';
import Button from "react-bootstrap/Button";

function LoginPage(props) {
  const router = useRouter()
  const [inputText, setInputText ] = useState("");
  const onChangeInput = ({target: {value}}) => setInputText(value);
  const onClickButton = () => {
    props.sendLogin({password: inputText});
  }

  useEffect(()=>{
    if (props.logged) router.push('/');
    if (props.rejected) alert("Hatalı şifre");
  }, [props]);

  return(<>
    <div className={styles.main_container}>
      <div className={styles.input_container}>
      <span className={styles.text_holder}>Password:</span>
        <span className={styles.input_holder}>
          <input
            type="password"
            className={styles.input_own}
            onChange={onChangeInput}
            />
        </span>
        <span className={styles.button_holder}><Button onClick={onClickButton}>Login</Button></span>
      </div>
    </div>
  </>);
  }

  const mapState = (state) => {
    return {
      login: state.login,
      logged: state.login.logged,
      pending: state.login.pending,
      rejected: state.login.rejected
    };
  };

  const mapDis = {
      sendLogin: (val) => actions.loginActions.sendLogin(val),
  };

export default connect(mapState, mapDis)(LoginPage);
