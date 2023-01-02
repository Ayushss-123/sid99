import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import _ from "lodash";
import { bindActionCreators } from 'redux';
import { fetchCampaigns, addUserToCampaign } from 'store/actions/CampaignActions';
import { UserCampaignStyles } from './UserCampaignStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

class UserCampaign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            campaign_id: '',
            items: [],
            isError: false
        }
    }


    componentDidMount() {
        if (!_.isNil(this.props.location.state)) {
            const { data } = this.props.location.state;
            const { id } = data;
            this.setState({ user_id: id });
            this.props.fetchCampaigns();
        }
    }

    handleChange = (event) => {
        let joined = [];
        if(event.target.checked) {
            const item = this.props.campaigns.filter(c => c.description == event.target.name);
            this.setState({ ...this.state, items: joined.concat(event.target.name), campaign_id: item[0].id });
        }
    }

    onSubmit = async (event) => {
        const { user_id, campaign_id } = this.state;
        const { data } = this.props;
        if(user_id == '' || campaign_id == '') {
            this.setState({ ...this.state, isError: true });
        } else {
            this.setState({ ...this.state, isError: false });
            await this.props.addUserToCampaign({ user_id, campaign_id });
        }
    }

    render() {
        const { classes, campaigns, data, loading } = this.props;
        return (
            <div>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Attach User To Campaign</h4>
                    </CardHeader>
                    <CardBody>
                        {this.state.isError ? <SnackbarContent message={'Kindly Select Campaign'} close color="danger" /> : ''}
                        {data.success && <SnackbarContent message={`${data.data.message}`} close color="success" />}
                        <Grid container direction="column">
                            { campaigns.map(data => (  
                            <Grid item xs={12} className={classes.userTextField} key={data.id}>
                                <FormControlLabel
                                    control={<Checkbox checked={_.includes(this.state.items, data.description) ? true : false} 
                                    onChange={this.handleChange} name={data.description} />}
                                    label={data.description} />
                            </Grid>
                            ))}
                        </Grid>
                    </CardBody>
                    <CardFooter>
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>Attach</Button>
                    </CardFooter>
                    { loading && <LinearProgress /> }
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        campaigns: state.campaign.campaigns,
        loading: state.campaign.loading,
        error: state.campaign.error,
        data: state.campaign.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCampaigns, addUserToCampaign }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserCampaignStyles)(UserCampaign));
