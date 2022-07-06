// import React, { useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, Card, Box, CardMedia, CardContent, CardHeader, CardActions, Typography, IconButton, Tooltip, Container } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import fetchUsers from '../store/users'
// import { Link } from "react-router-dom";
// import { grey } from "@material-ui/core/colors";
// import { useFrontEndStyles } from "../theme";
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// const PopUpWindowCardLogin = (name, displayName, handleSubmit, error) => {
//   const classes = useFrontEndStyles();

//   return (
//     // <Container maxWidth="lg">
//     <Card xs={12} md={6} lg={3} elevation={3} className={classes.p} variant="elevation" style={{background: "#808080"}} >
//       <CardContent>
//       <CardHeader align="center" title={<Typography className={classes.h4}>Welcome!</Typography>} />
//       </CardContent>
//       <CardActions>
//       </CardActions>
//     </Card>
//     // </Container>
//   );
// }

// export default PopUpWindowCardLogin;




// /**
//  * COMPONENT
//  */
// const LoginForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(LoginForm)







import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

const PopUpWindowCardLogin = () => {
  const defaultValues = {
    username: "",
    password: ""
  };
  const [formValues, setFormValues] = useState(defaultValues);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            id="username-input"
            name="username"
            label="Userame"
            type="text"
            variant="outlined"
            value={formValues.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="text"
            variant="outlined"
            value={formValues.password}
            onChange={handleChange}
          />
        </Grid>
        <Button href="/home" variant="contained" color="primary" type="submit">
          Log in
        </Button>
      {/* <div class='success-message'>Success! Thank you for registering</div> */}
      </Grid>
    </form>
  );
};
export default PopUpWindowCardLogin;