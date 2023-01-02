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

function CampaignRow(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  const attachUser = (data) => {      
    props.history.push({ pathname: '/admin/attach/user', state: { data }});
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
                    key={key}>
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
                    <TableCell className={classes.tableCell}> { prop.description } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.total_kits } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.remaining_kits } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.from_date } </TableCell>
                    <TableCell className={classes.tableCell}> { prop.to_date } </TableCell>
                    <TableCell className={classes.tableCell}><Button onClick={() => attachUser(prop)} variant="contained" color="primary">Edit</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CampaignRow.defaultProps = {
  tableHeaderColor: "gray"
};

export default withRouter(CampaignRow);