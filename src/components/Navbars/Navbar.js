import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { logout } from 'store/actions/AuthActions';
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(styles);

function Header(props) {
  const classes = useStyles();

  const logoutUser = async () => {
    await props.logout();
    props.history.push("/");
  }

  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
          <Button color="transparent" href="#" className={classes.title} onClick={logoutUser} >
            Logout
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
    logoutStatus: state.auth.logout,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));