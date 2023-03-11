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
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import axios from "axios";

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


function UserProfile({ user }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [password, setPassword] = useState("")
  const cookies = new Cookies()

  const logout = () => {
    const cookie = new Cookies()
    cookie.remove("jwtToken")
    router.push("/login")
  }

  const updatePasswordHandler = async () => {
    try {
      const result = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/user`,
        {
          password: password
        },
        {
          headers: {
            "Authorization": "Bearer " + cookies.get('jwtToken')
          }
        }
      )
      if (result.status == 200 || result.status == 201) {
        router.reload(window.location.pathname)
      }

    } catch (e) {
      console.log(e)
      alert('Something went wrong, please try again!')
    }
  }

  const createKeyPairHandler = async () => {
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/user/keys`, {
        user_id: user.user_id
      },
        {
          headers: {
            "Authorization": "Bearer " + cookies.get('jwtToken')
          }
        }
      )
      if (result.status == 200 || result.status == 201) {
        router.reload(window.location.pathname)
      }

    } catch (e) {
      console.log(e)
      alert('Something went wrong, please try again!')
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{ "type": "password" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </GridItem>
                <GridItem md={6}>
                  <Button style={{marginTop: '40px'}} color="primary" onClick={updatePasswordHandler}>Update Profile</Button>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem md={12}>
                  <Button color="success" onClick={createKeyPairHandler}>Create Key Pairs</Button>
                </GridItem>
                <GridItem>
                  <Button color="secondary" onClick={logout}>Logout</Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export async function getServerSideProps(ctx) {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const jwtToken = cookies.get('jwtToken')
  let user = null
  if (!jwtToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

  const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL
      }`,
    headers: { 'Authorization': 'Bearer ' + jwtToken }
  })

  try {
    const result = await client.get("/user")
    if (result.data && result.data.user_id) {
      user = result.data
    } else {
      cookies.remove('jwtToken')
    }
  } catch (e) {
    cookies.remove('jwtToken')
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

  return {
    props: { user: user }
  }
}

export default UserProfile;
