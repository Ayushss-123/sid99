import React from 'react';
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';

function EditUserAction(props) {

    const editUser = (data) => {
        data.action = 'EDIT'
        props.history.push({ pathname: '/admin/edit/user', state: { data }});
    }

    return (
        <Button style={{'background': 'green'}} onClick={() => editUser(props.data)} variant="contained" color="primary">Edit</Button>
    )
}

export default withRouter(EditUserAction);