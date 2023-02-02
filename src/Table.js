import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Table1 from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Table() {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = React.useState(false);
  const Record = (props) => (
    <>
      <TableRow>
        <TableCell>{props.record.name}</TableCell>
        <TableCell>{props.record.phone}</TableCell>
        <TableCell>{props.record.email}</TableCell>
        <TableCell>{props.record.address.city}</TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              UserName:{props.record.username}
              <br />
              Address: {props.record.address.street},
              {props.record.address.suite},{props.record.address.city},
              {props.record.address.zipcode}
              <br />
              Website:{props.record.website}
              <br />
              Company Details:
              <br />
              Name:{props.record.company.name}
              <br />
              Phrase:{props.record.company.catchPhrase}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        toast.error("You must be logged in!");
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          //  key={_id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <TableContainer component={Paper}>
        <Table1 aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
            </TableRow>
          </TableHead>
          <TableBody>{recordList()}</TableBody>
        </Table1>
      </TableContainer>
    </div>
  );
}
