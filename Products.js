import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";

export default function Products() {
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState(items);

  useEffect(() => {
    loadData();
  }, [items]);

  const loadData = () => {
    fetch("http://localhost:5000/api/product")
      .then((response) => response.json())
      .then((result) => {
        setItems(result);
        setRecords(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleUpdate = (id) => {
    window.location = "/update/" + id;
  };

  const handleRemove = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      device_id: id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/product/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "1000") {
          loadData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const searchData = (e) => {
    const filteredItems = items.filter(element => {
        if (element.name) {
            return element.name.toLowerCase().includes(e.target.value.toLowerCase());
        }
        return false;
    });
    setRecords(filteredItems);
};

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Link href="create">
                <Button variant="contained">CREATE</Button>
              </Link>
            </Box>
            <Box>
              <TextField
                type="text"
                placeholder="Search..."
                variant="outlined"
                onChange={searchData}
              />
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Serial</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.device_id}</TableCell>
                    <TableCell align="right">{row.device_name}</TableCell>
                    <TableCell align="right">{row.serial_no}</TableCell>
                    <TableCell align="right">{row.device_model}</TableCell>
                    <TableCell align="right">{row.device_brand}</TableCell>
                    <TableCell align="right">{row.date_stock}</TableCell>
                    <TableCell align="right">{row.device_price}</TableCell>
                    <TableCell align="right">{row.device_status}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <Button onClick={() => handleUpdate(row.device_id)}>
                          EDIT
                        </Button>
                        <Button onClick={() => handleRemove(row.device_id)}>
                          DEL
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
