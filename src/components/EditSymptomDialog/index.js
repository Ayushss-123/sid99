import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { UserProfileStyles } from "views/UserProfile/UserProfileStyles";
import { editAppSymptom } from "store/actions/SymptomActions";
import _ from "lodash";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { bindActionCreators } from 'redux';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class EditSymptomDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            active: false,
            symptom_id: '',
            symptom: {},
            isError: false
        }
    }

    componentDidMount() {
        const { symptom } = this.props;
        this.setState({ ...this.state, description: symptom.description, active: symptom.active, symptom_id: symptom.id });
    }

    onChange = (e) => {
        this.setState({ ...this.state, description: e.target.value });
    }

    onEdit = async () => {
        if(this.state.description == '') {
            this.setState({ ...this.state, isError: true });
        } else {
            this.setState({ ...this.state, isError: false });
            const { description, symptom_id, active } = this.state;
            await this.props.editAppSymptom({ description, symptom_id, active });
            this.props.handleClose();
        }
    }

    render() {
        const { open, loading } = this.props;
        const { classes } = this.props;
        return (
            <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true}>
                { loading && <LinearProgress color="secondary" />}
                <DialogTitle id="form-dialog-title">Edit Symptom</DialogTitle>
                {this.state.isError ? <SnackbarContent message={'Symptom cannot be empty'} close color="danger" /> : ''}
                <DialogContent>
                    <TextField className={classes.root} 
                    id="standard-basic" 
                    fullWidth 
                    label="Edit Symptom*" 
                    value={this.state.description} 
                    onChange={this.onChange} 
                    inputProps={{ name: 'description' }} />
                    <FormControlLabel
                        control={<GreenCheckbox checked={this.state.active} onClick={() => this.setState({ ...this.state, active: !this.state.active })} name="checkedG" />}
                        label="Symptom Active Status"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" disabled={loading} onClick={this.onEdit}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" disabled={loading} onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.symptom.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ editAppSymptom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(UserProfileStyles)(EditSymptomDialog));