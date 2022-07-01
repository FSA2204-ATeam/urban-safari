import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import fetchUsers from '../store/users'
import { Link } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { useFrontEndStyles } from "../theme";

const PopUpWindowCard = () => {
  const classes = useFrontEndStyles();

  return (
    <Container maxWidth="lg">
    <Card xs={12} md={6} lg={3} elevation={3} className={classes.p} variant="outlined" style={{background: "#808080"}} >
      <CardContent>
      <CardHeader align="center" title={<Typography className={classes.h4}>Welcome</Typography>} />
      </CardContent>
      {/* <CardActions>
      </CardActions> */}
    </Card>
    </Container>
  );
}

export default PopUpWindowCard;
