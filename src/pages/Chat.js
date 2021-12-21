import React from "react";
import {
  Grid,
  Divider,
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Badge
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 2)
  },
  divider: {
    backgroundColor: theme.palette.text.secondary
  },
  msgContainer: {
    padding: theme.spacing(3, 0),
    "& > div": {
      margin: theme.spacing(0.5)
    }
  },
  msgCard: {
    backgroundColor: theme.palette.card.default,
    borderRadius: theme.spacing(1),
    "& > div": {
      padding: theme.spacing(1)
    }
  },
  cardHeaderRoot: {
    marginRight: theme.spacing(1)
  },
  cardHeaderContent: {
    overflow: "hidden"
  },
  cardHeaderSubheader: {
    width: "100%",
    "& > div": {
      width: "100%",
      display: "flex",
      position: "relative",
      justifyContent: "space-between"
    }
  },
  userTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  msg: {
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  msgCount: {
    "& > span": {
      transform: "scale(0.7)"
    }
  }
}));

const ProfileBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0
    }
  }
}))(Badge);

const Chat = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justifyContent="space-between">
        <Grid item>Chat</Grid>
        <Grid item>Chat</Grid>
      </Grid>
      <Divider className={classes.divider} />
      <div className={classes.msgContainer}>
        {[0, 1, 2, 3, 4, 5].map((el, i) => (
          <Card key={i} className={classes.msgCard}>
            <CardHeader
              classes={{
                root: classes.cardHeaderRoot,
                content: classes.cardHeaderContent,
                subheader: classes.cardHeaderSubheader
              }}
              avatar={
                <ProfileBadge
                  color="primary"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  overlap="circular"
                  variant="dot"
                  invisible={false}>
                  <Avatar aria-label="user" className={classes.avatar}>
                    R
                  </Avatar>
                </ProfileBadge>
              }
              title={
                <div className={classes.userTitle}>
                  <Typography component="h1" variant="h6">
                    Kabir
                  </Typography>
                  <Typography component="p" variant="caption">
                    12:30pm
                  </Typography>
                </div>
              }
              subheader={
                <div>
                  <Typography component="p" variant="body2" className={classes.msg}>
                    You can override the style of the component thanks to one of these customization
                    points
                  </Typography>
                  <Badge className={classes.msgCount} color="primary" badgeContent={2} />
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Chat;
