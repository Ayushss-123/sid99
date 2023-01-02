import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CampaignRow from "components/CampaignRow";
import CardBody from "components/Card/CardBody.js";
import { TableListStyles } from "views/TableList/TableListStyles.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchCampaigns } from 'store/actions/CampaignActions';

class CampaignList extends React.Component {

  componentDidMount() {
    this.props.fetchCampaigns();
  }

   render() {
    const { classes, campaign, loading } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List Of Campaings</h4>
              <p className={classes.cardCategoryWhite}>Campaings</p>
            </CardHeader>
            <CardBody>
              <CampaignRow
                tableHeaderColor="primary"
                tableHead={["Description", "Total Kits", "Remaining Kits", "From Date", "To Date", "Actions"]}
                tableData={loading ? [] : campaign}
              />
            </CardBody>
              { loading && <LinearProgress color="secondary" /> }
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign.campaigns,
    loading: state.campaign.loading,
    error: state.campaign.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCampaigns }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(TableListStyles)(CampaignList));