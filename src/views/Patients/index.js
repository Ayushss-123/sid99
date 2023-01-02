import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableListStyles } from "views/TableList/TableListStyles.js";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TextField } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchAppPatients } from 'store/actions/PatientActions';
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

class Patients extends React.Component {

  state = {
    page: 0,
    limit: 5,
    searchTerm: ''
  }

  componentDidMount() {
    const { page, limit } = this.state;
    this.props.fetchAppPatients({ page, limit });
  }

  handleChangePage = (event, newPage) => {
    this.setState({ ...this.state, page: newPage });
    this.props.fetchAppPatients({ page: newPage, limit: this.state.limit });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ ...this.state, limit: event.target.value, page: 1 });
    this.props.fetchAppPatients({ page: 0, limit: event.target.value });
  };

  render() {
    const { page, limit } = this.state;
    const { patients, loading } = this.props;
    const pats = !_.isEmpty(patients) ? patients.data : [];
    const total = !_.isEmpty(patients) ? patients.total : 0;
    return (
      <div>
        <Paper>
          <TableContainer>
            {loading && <LinearProgress color="secondary" />}
            <Table stickyHeader aria-label="sticky table">
              <TableHead style={{ 'backgroundColor': 'green' }}>
                <TableRow>
                  <TableCell align={'left'} style={{ maxWidth: '170px' }}>Name</TableCell>
                  <TableCell align={'left'} style={{ maxWidth: '170px' }}>Phone</TableCell>
                  <TableCell align={'left'} style={{ maxWidth: '170px' }}>CNIC</TableCell>
                  <TableCell align={'left'} style={{ maxWidth: '170px' }}>Email</TableCell>
                  {/* <TableCell align={'left'} style={{ maxWidth: '170px' }}>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {pats.map((pat, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align={'left'}>{pat.name}</TableCell>
                    <TableCell align={'left'}>{pat.phone}</TableCell>
                    <TableCell align={'left'}>{pat.cnic}</TableCell>
                    <TableCell align={'left'}>{pat.email}</TableCell>
                    {/* <TableCell align={'left'}><EditUserAction data={usr} /><CampaignAction data={usr} /></TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={parseInt(total)}
            rowsPerPage={limit}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patient.patients,
    loading: state.patient.loading,
    error: state.patient.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAppPatients }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(TableListStyles)(Patients));
