/* eslint-disable no-constant-condition */
const hobbies = [
  "3D printing",
  "Amateur radio",
  "Scrapbook",
  "Amateur radio",
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Cabaret",
  "Calligraphy",
  "Candle making",
  "Computer programming",
  "Coffee roasting",
  "Cooking",
  "Colouring",
  "Cosplaying",
  "Couponing",
  "Creative writing",
  "Crocheting",
  "Cryptography",
  "Dance",
  "Digital arts",
  "Drama",
  "Drawing",
  "Do it yourself",
  "Electronics",
  "Embroidery",
  "Fashion",
  "Flower arranging",
  "Foreign language learning",
  "Gaming",
  "Tabletop games",
  "Role-playing games",
  "Gambling",
  "Genealogy",
  "Glassblowing",
  "Gunsmithing",
  "Homebrewing",
  "Ice skating",
  "Jewelry making",
  "Jigsaw puzzles",
  "Juggling",
  "Knapping",
  "Knitting",
  "Kabaddi",
  "Knife making",
  "Lacemaking",
  "Lapidary",
  "Leather crafting",
  "Lego building",
  "Lockpicking",
  "Machining",
  "Macrame",
  "Metalworking",
  "Magic",
  "Model building",
  "Listening to music",
  "Origami",
  "Painting",
  "Playing musical instruments",
  "Pet",
  "Poi",
  "Pottery",
  "Puzzles",
  "Quilting",
  "Reading",
  "Scrapbooking",
  "Sculpting",
  "Sewing",
  "Singing",
  "Sketching",
  "Soapmaking",
  "Sports",
  "Stand-up comedy",
  "Sudoku",
  "Table tennis",
  "Taxidermy",
  "Video gaming",
  "Watching movies",
  "Web surfing",
  "Whittling",
  "Wood carving",
  "Woodworking",
  "World Building",
  "Writing",
  "Yoga",
  "Yo-yoing",
  "Air sports",
  "Archery",
  "Astronomy",
  "Backpacking",
  "Base jumping",
  "Baseball",
  "Basketball",
  "Beekeeping",
  "Bird watching",
  "Blacksmithing",
  "Board sports",
  "Bodybuilding",
  "Brazilian jiu-jitsu",
  "Community",
  "Cycling",
  "Dowsing",
  "Driving",
  "Fishing",
  "Flag football",
  "Flying",
  "Flying disc",
  "Foraging",
  "Gardening",
  "Geocaching",
  "Ghost hunting",
  "Graffiti",
  "Handball",
  "Hiking",
  "Hooping",
  "Horseback riding",
  "Hunting",
  "Inline skating",
  "Jogging",
  "Kayaking",
  "Kite flying",
  "Kitesurfing",
  "Larping",
  "Letterboxing",
  "Metal detecting",
  "Motor sports",
  "Mountain biking",
  "Mountaineering",
  "Mushroom hunting",
  "Mycology",
  "Netball",
  "Nordic skating",
  "Orienteering",
  "Paintball",
  "Parkour",
  "Photography",
  "Polo",
  "Rafting",
  "Rappelling",
  "Rock climbing",
  "Roller skating",
  "Rugby",
  "Running",
  "Sailing",
  "Sand art",
  "Scouting",
  "Scuba diving",
  "Sculling",
  "Rowing",
  "Shooting",
  "Shopping",
  "Skateboarding",
  "Skiing",
  "Skim Boarding",
  "Skydiving",
  "Slacklining",
  "Snowboarding",
  "Stone skipping",
  "Surfing",
  "Swimming",
  "Taekwondo",
  "Tai chi",
  "Urban exploration",
  "Vacation",
  "Vehicle restoration",
  "Water sports"
];
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  Badge,
  TextField,
  Select,
  MenuItem,
  InputBase
} from "@material-ui/core";
import { KeyboardBackspace, CheckCircleOutlined, PhotoCamera } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import classNames from "classnames";
import { personalDataStyles } from "../assets/jss";
import { updateProfile, getUserProfile, uploadAvatar } from "../redux/actions/userActions";
import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";
const useStyles = makeStyles((theme) => personalDataStyles(theme));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const PersonalData = ({ userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user?.userInfo);
  const { loading } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  // console.log(profile);
  const [formData, setFormData] = useState({
    usernameData: "",
    genderData: 0,
    bioData: "",
    // ageData: new Date(),
    locationData: "",
    relationshipStatusData: 0,
    hobbiesData: []
  });
  useEffect(() => {
    if (!profile) dispatch(getUserProfile(userId));
    if (profile)
      setFormData({
        usernameData: profile.displayName.value,
        genderData: profile.gender.value,
        bioData: profile.headline.value,
        ageData: profile.dob.value || new Date(),
        locationData: profile.location.value,
        relationshipStatusData: profile.relationshipStatus.value,
        hobbiesData: profile.hobby.value
      });
  }, [profile]);
  // console.log(formData);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateProfile({ userId, data: formData }));
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const newImage = e?.target?.files?.[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      console.log(newImage);
      dispatch(uploadAvatar({ userId, data: newImage }));
    }
  };

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
              <input
                onChange={handleAvatarChange}
                accept="image/*"
                className={classes.input}
                id="upload-avatar"
                type="file"
              />
              <label htmlFor="upload-avatar">
                <IconButton color="secondary" aria-label="upload avatar" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          }>
          {loading ? (
            <Skeleton width={100} height={150} animation="wave">
              <Avatar className={classes.avatar} />
            </Skeleton>
          ) : (
            <Avatar
              src={image || profile?.avatar.value}
              className={classes.avatar}
              variant="rounded"
            />
          )}
        </Badge>
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            {formData.genderData === 0 ? "Male" : formData.genderData === 1 ? "Female" : ""}
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        {!loading ? (
          <form onSubmit={handleSubmit}>
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
                name="bioData"
                value={formData.bioData}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Display name
              </Typography>
              <TextField
                className={classNames(classes.textField)}
                placeholder="Username"
                variant="outlined"
                fullWidth
                size="small"
                name="usernameData"
                value={formData.usernameData}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Date of Birth
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  maxDate={new Date(new Date() - 13 * 365 * 24 * 60 * 60 * 1000)}
                  minDate={new Date(new Date() - 35 * 365 * 24 * 60 * 60 * 1000)}
                  className={classes.textField}
                  autoOk
                  inputVariant="outlined"
                  fullWidth
                  size="small"
                  format="dd/MM/yyyy"
                  value={new Date(formData.ageData)}
                  name="ageDate"
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(selectedDate) =>
                    setFormData((state) => ({ ...state, ageData: selectedDate }))
                  }
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Relationship Status
              </Typography>
              <Select
                id="demo-customized-select-label"
                variant="outlined"
                fullWidth
                name="relationshipStatusData"
                input={<BootstrapInput />}
                value={Number(formData.relationshipStatusData)}
                onChange={(e) => onChange(e)}>
                <MenuItem value={0}>single</MenuItem>
                <MenuItem value={1}>commited</MenuItem>
                <MenuItem value={2}>married</MenuItem>
                <MenuItem value={3}>heart-broken</MenuItem>
              </Select>
            </div>
            <div className={classNames(classes.fullWidth, classes.hobby)}>
              <Typography component="h6" variant="h6">
                Hobbies & Interest
              </Typography>
              <Autocomplete
                multiple
                options={hobbies}
                getOptionLabel={(option) => option}
                name="hobbiesData"
                value={formData?.hobbiesData}
                filterSelectedOptions
                onChange={(e, value) =>
                  setFormData((state) => ({
                    ...state,
                    hobbiesData: [...value]
                  }))
                }
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
                name="locationData"
                value={formData.locationData}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Gender
              </Typography>
              <Select
                id="demo-customized-select-label"
                variant="outlined"
                fullWidth
                name="relationshipStatusData"
                input={<BootstrapInput />}
                value={formData.genderData}
                onChange={(e) => onChange(e)}>
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </Select>
            </div>
            <div className={classes.fullWidth}>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3ch" }}>
                <Button className={classes.button} color="primary" variant="contained" disabled>
                  Verify Gender
                </Button>
                <Button variant="contained" color="secondary" type="submit">
                  Update Profile
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <Skeleton animation="wave" />
          </div>
        )}
      </div>
    </Container>
  );
};

PersonalData.propTypes = {
  userId: PropTypes.string.isRequired
};

export default PersonalData;
