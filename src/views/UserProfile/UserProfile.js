import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { UserProfileStyles } from "./UserProfileStyles";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { TextField, Grid } from '@material-ui/core';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from 'redux';
import { saveNewUser, editSystemUser } from 'store/actions/UserActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "components/Alert";
import campaign from "store/reducers/CampaignReducer";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!_.isNil(this.props.location.state)) {
      const { data } = this.props.location.state;
      const { name, phone, cnic, organization, email, action, id, userWiseCampaign, active } = data;
      const campaign = !_.isNil(userWiseCampaign) ? userWiseCampaign.campaign.description : null;
      this.setState({ name, phone, cnic, organization, email, action, id, campaign, active });
    }
  }

  state = {
    id: '',
    name: '',
    phone: '',
    cnic: '',
    organization: '',
    email: '',
    password: '',
    isError: false,
    action: 'ADD',
    campaign: null,
    active: true
  }

  userActiveStatus = (event) => {
    this.setState({  ...this.state, [event.target.name]: event.target.checked });
  }

  onSubmit = async (e) => {
    if (_.isEqual(this.state.action, 'ADD')) {
      if (_.isEmpty(this.state.name) || _.isEmpty(this.state.phone) || _.isEmpty(this.state.cnic) || _.isEmpty(this.state.organization) ||
        _.isEmpty(this.state.email) || _.isEmpty(this.state.password)) {
        this.setState({ ...this.state, isError: true });
      } else {
        this.setState({ ...this.state, isError: false });
        const { name, phone, cnic, organization, email, password, active } = this.state;
        await this.props.saveNewUser({ name, phone, cnic, organization, email, password, active });
        this.setState({ ...this.state, name: '', phone: '', cnic: '', organization: '', email: '', password: '', active: true });
      }
    } else {
      const { id, name, phone, cnic, organization, email, password, active } = this.state;
      await this.props.editSystemUser({ id, name, phone, cnic, organization, email, password, active });
    }
  }

  render() {
    const { classes, user, loading, userCampData } = this.props;
    const title = _.isEqual(this.state.action, 'ADD') ? 'Add User' : 'Edit User';
    return (
      <div>
        <Card>
          <CardHeader style={{ 'background': 'green' }}>
            <h4 className={classes.cardTitleWhite}>{title}</h4>
          </CardHeader>
          {loading && <LinearProgress color="secondary" />}
          <CardBody>
            {this.state.isError ? <SnackbarContent message={'Fields with * are marked as required'} close color="danger" /> : ''}
            {user && user.success && <SnackbarContent message="User Saved Successfully" close color="success" />}
            <Grid container direction="column">
              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Name*" value={this.state.name} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'name' }} />
              </Grid>
              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Phone*" value={this.state.phone} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'phone' }} />
              </Grid>
              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Cnic*" value={this.state.cnic} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'cnic' }} />
              </Grid>

              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Organization*" value={this.state.organization} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'organization' }} />
              </Grid>

              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Email*" value={this.state.email} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'email' }} />
              </Grid>
              <Grid item xs={12} className={classes.userTextField}>
                <TextField className={classes.root} id="standard-basic" fullWidth label="Password*" value={this.state.password} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'password', type: 'password' }} />
              </Grid>
              <Grid item xs={12} className={classes.userTextField}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.active}
                      onChange={this.userActiveStatus}
                      name="active"
                      color="primary"
                    />
                  }
                  label={`User Is ${this.state.active ? 'Active' : 'Inactive'}`}
                />
              </Grid>
              <Grid>
                {_.isEqual(this.state.action, 'EDIT') &&
                  <Alert severity={_.isNil(this.state.campaign) ? "error" : "success"}>
                    {_.isNil(this.state.campaign) ? "No Campaign Assiged to this User" : `Assigned Campaign : ${this.state.campaign}`}
                  </Alert>
                }
              </Grid>
            </Grid>
          </CardBody>
          <CardFooter>
            <Button disabled={loading} style={{ 'background': 'green' }} onClick={this.onSubmit}>{title}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    userCampData: state.user.userCampData,
    loading: state.user.loading,
    error: state.user.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveNewUser, editSystemUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserProfileStyles)(UserProfile));