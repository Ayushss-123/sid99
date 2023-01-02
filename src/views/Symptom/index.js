import React from 'react';
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, LinearProgress, Paper, Button, Grid, TextField } from '@material-ui/core';
import { getAllSymptoms, editAppSymptom, addAppSymptom } from 'store/actions/SymptomActions';
import _ from "lodash";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { SymptomStyles } from "./SymptomStyles";
import { bindActionCreators } from 'redux';
import EditSymptomDialog from 'components/EditSymptomDialog';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

class Symptom extends React.Component {

    state = {
        symptom: '',
        data: [],
        isError: false,
        openDialog: false,
        editBody: {}
    }

    componentDidMount() {
        this.props.getAllSymptoms();
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.loading ? [] : props.symptoms
        }
    }

    addSymptom = async () => {
        if(this.state.symptom == '')
            this.setState({ ...this.state, isError: true });
        else {
            this.setState({ ...this.state, isError: false });
            await this.props.addAppSymptom({ description: this.state.symptom });
            await this.props.getAllSymptoms();
         
        }
    }

    handleClose = () => {
        this.setState({...this.state, openDialog: false, editBody: {}, data: []});
        this.props.getAllSymptoms()
    }

    editSymptom = async (symptom) => {
        this.setState({ ...this.state, openDialog: true, editBody: symptom });
    }

    render() {
        const { loading, error, message, classes } = this.props;
        return (
            <div>
                {this.state.isError ? <SnackbarContent message={'Symptom cannot be empty'} close color="danger" /> : ''}
                {message && message.success && <SnackbarContent message={message.data.message} close color="success" />}
                <Paper elevation={3} className={classes.paperStyle} variant="outlined">
                    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={5}>
                        <Grid item xs={10} className={classes.userTextField}>
                            <TextField className={classes.root} id="standard-basic" fullWidth label="Add Symptom*" value={this.state.symptom} onChange={(e) => this.setState({ ...this.state, [e.target.name]: e.target.value })} inputProps={{ name: 'symptom' }} />
                        </Grid>
                        <Grid item xs={2} className={classes.btnAddSymptom}>
                            <Button variant="contained" color="primary" onClick={this.addSymptom}>Add</Button>
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
                                        <Button variant="contained" color="primary" onClick={() => this.editSymptom(row)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { this.state.openDialog && <EditSymptomDialog symptom={this.state.editBody} handleClose={this.handleClose} /> }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        symptoms: state.symptom.symptoms,
        message: state.symptom.message,
        loading: state.symptom.loading,
        error: state.symptom.error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAllSymptoms, editAppSymptom, addAppSymptom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SymptomStyles)(Symptom));
