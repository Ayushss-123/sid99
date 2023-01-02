import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(styles);

function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  const editUser = (data) => {
    data.action = 'EDIT'
    props.history.push({ pathname: '/admin/edit/user', state: { data }});
  }

  const attachCampaign = (data) => {
    props.history.push({ pathname: '/admin/user/campaign', state: { data }});
  }

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell}> { prop.name } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.phone } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.cnic } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.email } </TableCell>
                    <TableCell className={classes.tableCell}>
                        <Button style={{'background': 'green'}} onClick={() => editUser(prop)} variant="contained" color="primary">Edit</Button>
                        <Button style={{'background': 'green', 'marginLeft': '5px'}} onClick={() => attachCampaign(prop)} variant="contained" color="primary">Attach To Campaign</Button>
                    </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

export default withRouter(CustomTable);