import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Link from 'next/link'
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from 'next/router'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function Login() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [formValue, setFormValue] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/login', formValue)
      if (result.data && result.data.token) {
        const cookies = new Cookies()
        cookies.set('jwtToken', result.data.token, { path: '/' })
        router.push('/dashboard')
      }
    } catch (e) {
      console.log(e)
      if (e.response && e.response.data) {
        alert(e.response.data)
      } else {
        alert('Something went wrong, please try again later!')
      }
    }
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
      <div style={{ width: '50%', height: '50%' }}>
        <form onSubmit={handleLogin}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Password Manager</h4>
            <p className={classes.cardCategoryWhite}>Login to your account</p>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) => setFormValue({ ...formValue, 'email': e.target.value })}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{ "type": "password" }}
                  onChange={(e) => setFormValue({ ...formValue, 'password': e.target.value })}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="primary" type="submit">Login</Button>
            <Link href="/register">Create an account</Link>
          </CardFooter>
        </Card>
        </form>
      </div>
    </div>
  );
}

export default Login;
