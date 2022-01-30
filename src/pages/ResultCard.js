import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Avatar,
  Button,
  Typography,
  Paper
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { VerifyUserIcon } from "../assets/icons";
import Tags from "../components/Tags";
const useStyles = makeStyles((theme) => ({
  result: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  root: {
    maxWidth: "90vw",
    backgroundColor: theme.palette.background.default
  },
  image: {
    height: "8rem",
    width: "8rem",
    margin: "2rem 0 1rem 0"
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const ResultCard = ({ isTheme, setTheme }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.result}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent align="center">
            <Avatar variant="rounded" className={classes.image} src={"https://bit.ly/3Ez2w7J"} />
            <Typography variant="h5" component="h2">
              Lizard
              {"    "} <VerifyUserIcon />
            </Typography>
            <Typography gutterBottom variant="body1" component="h2">
              Silchar, assam
            </Typography>
            <Typography variant="body1" component="p">
              {
                "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
              }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action}>
          <Button variant="outlined" color="primary">
            Next
          </Button>
          <Button variant="contained" color="primary">
            Message
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="h5">
            Hobbies
          </Typography>
          <Tags tags={["cricket", "photography", "Coding", "Gaming", "movies"]} />
        </CardContent>
      </Card>
    </Paper>
  );
};

ResultCard.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default ResultCard;
