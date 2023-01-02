import React from 'react';
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import _ from 'lodash';

function CampaignAction(props) {

    const title = _.isNil(props.data.userWiseCampaign) ? 'Attach' : 'Modify';

    const attachCampaign = (data) => {
        props.history.push({ pathname: '/admin/user/campaign', state: { data }});
    }

    return (
    <Button style={{'background': 'green', 'marginLeft': '5px'}} onClick={() => attachCampaign(props.data)} variant="contained" color="primary">{title}</Button>
    )
}

export default withRouter(CampaignAction);