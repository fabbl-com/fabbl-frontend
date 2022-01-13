const hobbies = ["hobby 1", "hobby 2", "hobby 3", "hobby 4", "hobby 5"];
import React, { useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  Badge,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { KeyboardBackspace, CheckCircleOutlined, PhotoCamera } from "@material-ui/icons";

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";

import classNames from "classnames";

import { personalDataStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => personalDataStyles(theme));

const PersonalData = () => {
  const classes = useStyles();

  const [value, setValue] = useState(1);

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          Personal Data
        </Typography>
        <div />
      </div>
      <div className={classes.profileBody}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          badgeContent={
            <>
              <input accept="image/*" className={classes.input} id="upload-avatar" type="file" />
              <label htmlFor="upload-avatar">
                <IconButton color="secondary" aria-label="upload avatar" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          }>
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            className={classes.avatar}
            variant="rounded"
          />
        </Badge>
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            Female
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Headline
          </Typography>
          <TextField
            className={classes.textField}
            placeholder="Headline"
            variant="outlined"
            fullWidth
            multiline
            size="small"
            defaultValue={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut natus voluptates sunt rerum,quos  earum perferendis animi molestiae`}
          />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Username
          </Typography>
          <TextField
            className={classNames(classes.textField)}
            placeholder="Username"
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={`Username`}
          />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Date of Birth
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.textField}
              autoOk
              inputVariant="outlined"
              fullWidth
              size="small"
              format="dd/MM/yyyy"
              value={selectedDate}
              InputAdornmentProps={{ position: "end" }}
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Relationship Status
          </Typography>
          <Autocomplete
            options={["single", "In a Relationship", "Broken heart"]}
            getOptionLabel={(option) => option}
            defaultValue={"single"}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                className={classes.textField}
                variant="outlined"
                placeholder="Relationship Status"
              />
            )}
          />
        </div>
        <div className={classNames(classes.fullWidth, classes.hobby)}>
          <Typography component="h6" variant="h6">
            Hobbies & Interest
          </Typography>
          <Autocomplete
            multiple
            options={hobbies}
            getOptionLabel={(option) => option}
            defaultValue={[hobbies[1]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                className={classes.textField}
                variant="outlined"
                placeholder="Hobbies & Interest"
              />
            )}
          />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Location
          </Typography>
          <TextField
            className={classNames(classes.textField)}
            placeholder="Location"
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={`Guwahati, India`}
          />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Gender
          </Typography>
          <div className={classes.fullWidth}>
            <FormControl className={classNames(classes.formControl)} size="small">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                className={classes.radioGroup}
                onChange={(e) => setValue(e.target.value)}>
                <Button className={classes.button} variant="outlined" size="small">
                  <FormControlLabel value={1} control={<Radio />} label="Female" />
                </Button>
                <Button className={classes.button} variant="outlined" size="small">
                  <FormControlLabel value={2} control={<Radio />} label="Male" />
                </Button>
                <Button className={classes.button} variant="outlined" size="small">
                  <FormControlLabel value={3} control={<Radio />} label="Others" />
                </Button>
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={classes.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3ch" }}>
            <Button className={classes.button} color="primary" variant="contained" disabled>
              Verify Gender
            </Button>
            <Button variant="contained" color="secondary">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PersonalData;
