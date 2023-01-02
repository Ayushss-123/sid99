import React from 'react';
import { withStyles } from "@material-ui/core/styles";
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
import LinearProgress from '@material-ui/core/LinearProgress';
import { CampaignStyles } from './CampaignStyles';
import { addNewCampaign } from 'store/actions/CampaignActions';

class Campaign extends React.Component {

    state = {
        description: '',
        total_kits: '',
        from_date: '',
        to_date: '',
    }

    onSubmit = async (e) => {
        if (_.isEmpty(this.state.description) || _.isEmpty(this.state.total_kits) ||  _.isEmpty(this.state.from_date) || _.isEmpty(this.state.to_date)) {
            this.setState({ ...this.state, isError: true });
        } else {
            this.setState({ ...this.state, isError: false });
            const { description, total_kits, from_date, to_date } = this.state;
            await this.props.addNewCampaign({ description, total_kits, remaining_kits: total_kits, from_date, to_date });
            this.setState({ description, total_kits, from_date, to_date });
        }
    }

    render() {
        const { classes, campaign, loading } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader style={{'background': 'green'}}>
                        <h4 className={classes.cardTitleWhite}>Add Campaign</h4>
                    </CardHeader>
                    <CardBody>
                        {this.state.isError ? <SnackbarContent message={'Fields with * are marked as required'} close color="danger" /> : ''}
                        {campaign.success && !_.isEmpty(this.state.description) && <SnackbarContent message={campaign.data.message} close color="success" />}
                        <Grid container direction="column">
                            <Grid item xs={12} className={classes.userTextField}>
                                <TextField className={classes.root} id="standard-basic" fullWidth label="Description*" value={this.state.description} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'description' }} />
                            </Grid>
                            <Grid item xs={12} className={classes.userTextField}>
                                <TextField className={classes.root} id="standard-basic" fullWidth label="Total Kits*" value={this.state.total_kits} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'total_kits' }} />
                            </Grid>
                            <Grid item xs={12} className={classes.userTextField}>
                                <TextField className={classes.root} fullWidth label="From Date" type="date" inputProps={{ name: 'from_date' }} InputLabelProps={{ shrink: true }} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} />
                            </Grid>
                            <Grid item xs={12} className={classes.userTextField}>
                                <TextField className={classes.root} fullWidth label="To Date" type="date" inputProps={{ name: 'to_date' }} InputLabelProps={{ shrink: true }} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} />
                            </Grid>
                        </Grid>
                    </CardBody>
                    <CardFooter>
                        <Button style={{'background': 'green'}} disabled={loading} color="primary" onClick={this.onSubmit.bind(this)}>Add Campaign</Button>
                    </CardFooter>
                    {loading && <LinearProgress color="secondary" />}
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        campaign: state.campaign.data,
        loading: state.campaign.loading,
        error: state.campaign.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewCampaign }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(CampaignStyles)(Campaign));
