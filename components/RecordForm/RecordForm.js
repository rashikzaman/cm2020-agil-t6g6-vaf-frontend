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

export default function RecordForm({values, setValues}) {

    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        name="title"
                        labelText="Title"
                        id="title"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        
                        onChange={(e) => setValues({ ...values, 'title': e.target.value })}
                        inputProps={{ "required": true, value: values.title }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        name="login"
                        labelText="Login Email/Username"
                        id="email"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={(e) => setValues({ ...values, 'login': e.target.value })}
                        inputProps={{ "required": true, value: values.login }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={clsx(classes.textField)} style={{ marginTop: '27px' }}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            required
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={(e) => setValues({ ...values, 'value': e.target.value })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        name="website"
                        labelText="Website Address"
                        id="website"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={(e) => setValues({ ...values, 'website_address': e.target.value })}
                        inputProps={{ value: values.website_address }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        name="expiration_days"
                        labelText="Expiration Days"
                        id="expiration_days"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={(e) => setValues({ ...values, 'expiration_days': e.target.value })}
                        inputProps={{ value: values.expiration_days }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        name="comment"
                        labelText="Comment"
                        id="url"
                        formControlProps={{
                            fullWidth: true,
                        }}
                        onChange={(e) => setValues({ ...values, 'comments': e.target.value })}
                        inputProps={{ value: values.comments }}
                    />
                </GridItem>
                <GridItem md={6}></GridItem>
                <GridItem md={6}>
                    <div style={{ marginTop: '16px' }}>
                        <input type="checkbox" id="check_repetition" name="check_repetition"
                            checked={values.check_repetition}
                            onChange={(e) => setValues({ ...values, 'check_repetition': !values.check_repetition })}
                        />
                        <label htmlFor="vehicle1">Check Repetition</label><br></br>
                    </div>
                </GridItem>
                <GridItem md={6}>
                    <div style={{ marginTop: '16px' }}>
                        <input type="checkbox" id="check_leak" name="check_leak"
                            checked={values.check_leak}
                            onChange={(e) => setValues({ ...values, 'check_leak': !values.check_leak })}
                        />
                        <label htmlFor="vehicle1">Check Leak</label><br></br>
                    </div>
                </GridItem>
            </GridContainer>
        </div>
    )
}
