import React from 'react';
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, LinearProgress, Paper, Button, Grid, TextField } from '@material-ui/core';
import { fetchAppResultStates, addAppResultStates } from 'store/actions/ResultStateActions';
import _ from "lodash";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { SymptomStyles } from "views/Symptom/SymptomStyles";
import { bindActionCreators } from 'redux';
import EditResultStateDialog from 'components/EditResultStateDialog';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

class TestResultState extends React.Component {

    state = {
        result_state: '',
        data: [],
        isError: false,
        openDialog: false,
        editBody: {}
    }

    componentDidMount() {
        this.props.fetchAppResultStates();
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.loading ? [] : props.states
        }
    }

    addResultState = async () => {
        if(this.state.result_state == '')
            this.setState({ ...this.state, isError: true });
        else {
            this.setState({ ...this.state, isError: false });
            await this.props.addAppResultStates({ description: this.state.result_state })
            await this.props.fetchAppResultStates();
        }
    }

    handleClose = () => {
        this.setState({...this.state, openDialog: false, editBody: {}, data: []});
        this.props.fetchAppResultStates()
    }

    editResultState = async (state) => {
        this.setState({ ...this.state, openDialog: true, editBody: state });
    }

    render() {
        const { loading, error, classes, message } = this.props;
        return (
            <div>
                {this.state.isError ? <SnackbarContent message={'Result State cannot be empty'} close color="danger" /> : ''}
                {message && message.success && <SnackbarContent message={message.data.message} close color="success" />}
                <Paper elevation={3} className={classes.paperStyle} variant="outlined">
                    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={5}>
                        <Grid item xs={10} className={classes.userTextField}>
                            <TextField className={classes.root} id="standard-basic" fullWidth label="Add Result State*" value={this.state.result_state} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'result_state' }} />
                        </Grid>
                        <Grid item xs={2} className={classes.btnAddSymptom}>
                            <Button variant="contained" color="primary" onClick={this.addResultState}>Add</Button>
                        </Grid>
                    </Grid>
                </Paper>
                <TableContainer component={Paper}>
                    { loading && <LinearProgress color="secondary" />}
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.active ? "Active" : "In Active"}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => this.editResultState(row)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { this.state.openDialog && <EditResultStateDialog result={this.state.editBody} handleClose={this.handleClose} /> }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        states: state.resultStates.states,
        loading: state.resultStates.loading,
        error: state.resultStates.error,
        message: state.resultStates.message,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAppResultStates, addAppResultStates }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SymptomStyles)(TestResultState));
