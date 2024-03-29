import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function UserUpdate() {
  const params = useParams();

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    fetch("http://localhost:5000/api/product/" + id)
      .then((response) => response.json())
      .then((result) => {
        setDevice_id(result.device_id);
        setDevice_name(result.device_name);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "device_id": device_id,
      "device_name": device_name,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/product/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "1000") {
          window.location.href = "/";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [device_id, setDevice_id] = useState("");
  const [device_name, setDevice_name] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography ariant="h6" gutterBottom>
          Update User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="device_id"
                label="รหัสอุปกรณ์"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setDevice_id(e.target.value)}
                value={device_id}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="device_name"
                label="ชื่ออุปกรณ์"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setDevice_name(e.target.value)}
                value={device_name}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth required>
                UPDATE
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default UserUpdate;
