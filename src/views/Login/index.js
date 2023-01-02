import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from 'store/actions/AuthActions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "& .MuiInputLabel-outlined": {
      color: "green"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "green"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "green"
    }
  }
}));

function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email == '' || password == '')
      setError(true);
    else {
      setError(false);
      await props.login({ email, password });
    }
  }

  if (props.user && props.user.data.isloggedIn && !_.isNil(localStorage.getItem('user_token'))) {
    props.history.push('/admin/dashboard');
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h3" style={{ marginTop: '40px' }}>Admin Login</Typography>
      <LinearProgress color="secondary" />
      <Paper elevation={3} style={{ borderRadius: '10px', padding: '40px', textAlign: 'center' }}>
        <img src={require('assets/img/govt_sindh_4.gif')} />
        {error && <SnackbarContent message={'Fields With * Are Marked As Required'} close color="danger" />}
        <form className={classes.form} noValidate>
          {props.error && <SnackbarContent message={'Invalid Email or Password'} close color="danger" />}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            className={classes.root}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            className={classes.root}
            autoComplete="current-password"
          />
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              className={classes.submit}
              disabled={props.loading}
              onClick={onSubmit}
              style={{background: 'green', margin: '20px 0 20px 0'}}>
              Login
        </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </form>
      </Paper>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({ login }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));