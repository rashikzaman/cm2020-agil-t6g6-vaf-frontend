import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import { Modal, Box, Typography, FormControlLabel } from "@material-ui/core";
import Cookies from "universal-cookie";
import axios from "axios";
import { CheckBox } from "@material-ui/icons";
import RecordForm from "../components/RecordForm/RecordForm";
import { useRouter } from "next/router";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const initialValue = {
    value: makeid(16),
    showPassword: false,
  }
  const [values, setValues] = React.useState(initialValue);
  const [modalValues, setModalValues] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cookies = new Cookies()
  const router = useRouter()

  const [passwords, setPasswords] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchPasswords()
  }, [])

  const fetchPasswords = async () => {
    try {
      const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/records', {
        headers: {
          "Authorization": "Bearer " + cookies.get('jwtToken')
        }
      })
      const data = result.data.map((item) => {
        return {...item, login: item.record_login, value: item.record_value}})
      setPasswords(data)
    } catch (e) {
      console.error(e)
    }
  }

  const passwordCreateHandler = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/records',
        {
          record: {
            "title": values.title,
            "login": values.login,
            "value": values.value,
            "website_address": values.website_address,
            "comments": values.comments,
            "password_length": values.value.length,
            "expiration_days": values.expiration_days,
            "check_repetition": values.check_repetition,
            "check_leak": values.check_leak
          },
        },
        {
          headers: {
            "Authorization": "Bearer " + cookies.get('jwtToken')
          }
        }
      )

      if (result.status == 200) {
        router.reload(window.location.pathname)
      }

    } catch (e) {
      console.log(e)
      alert('Something went wrong, please try again!')
    }
  }

  const passwordUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/records`,
        {
          record: {
            "id": modalValues.record_id,
            "title": modalValues.title,
            "login": modalValues.login, 
            "value": modalValues.value,
            "website_address": modalValues.website_address,
            "comments": modalValues.comments,
            "password_length": modalValues.value?.length,
            "expiration_days": modalValues.expiration_days,
            "check_repetition": modalValues.check_repetition,
            "check_leak": modalValues.check_leak
          },
        },
        {
          headers: {
            "Authorization": "Bearer " + cookies.get('jwtToken')
          }
        }
      )

      if (result.status == 200) {
        router.reload(window.location.pathname)
      }

    } catch (e) {
      console.log(e)
      alert('Something went wrong, please try again!')
    }
  }

  const deletePasswordHandler = async () => {
    try {
      const result = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/records?recordId=${modalValues.record_id}`,
        {
          headers: {
            "Authorization": "Bearer " + cookies.get('jwtToken')
          }
        }
      )

      if (result.status == 200) {
        router.reload(window.location.pathname)
      }

    } catch (e) {
      console.log(e)
      alert('Something went wrong, please try again!')
    }
  }

  useEffect(() => {
    const tempPasswords = passwords.map((item) => {
      delete item.password
      delete item.showPassword
      return item
    })
    setTableData(tempPasswords)
  }, [passwords])

  const tableOnClick = (index) => {
    setModalValues(passwords[index])
    setOpen(true)
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <form onSubmit={passwordCreateHandler}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Password Manager</h4>
                <p className={classes.cardCategoryWhite}>Create new record</p>
              </CardHeader>
              <CardBody>
                <RecordForm values={values} setValues={setValues} />
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Create</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List of your passwords</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={["Title", "Website", "Email/Username"]}
                tableData={tableData}
                rowOnClick={tableOnClick}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <GridItem xs={12} sm={12} md={6} style={{ marginTop: '10%', marginLeft: '30%' }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Password Manager</h4>
              <p className={classes.cardCategoryWhite}>Update record</p>
            </CardHeader>
            <form onSubmit={passwordUpdateHandler}>
              <CardBody>
                <RecordForm values={modalValues} setValues={setModalValues} />
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Update</Button>
                <Button color="danger" onClick={() => deletePasswordHandler()}>Delete</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </Modal>
    </div>
  );
}

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

  if(!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

Dashboard.layout = Admin;

export default Dashboard;
