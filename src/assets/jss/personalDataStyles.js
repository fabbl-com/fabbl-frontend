const chatStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(6)
  },
  profileHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profileBody: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    width: "100%"
  },
  avatar: {
    height: theme.spacing(24),
    width: theme.spacing(24),
    [theme.breakpoints.down("md")]: {
      height: theme.spacing(12),
      width: theme.spacing(12)
    }
  },
  verify: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: theme.palette.success.main
    }
  },
  input: {
    display: "none"
  },
  headline: {
    width: "100%",
    margin: theme.spacing(1, 0)
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.secondary
      }
    }
  },
  fullWidth: {
    width: "100%",
    margin: theme.spacing(1, 0)
  },
  formControl: {
    width: "100%"
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  button: {
    borderColor: theme.palette.text.secondary,
    margin: theme.spacing(1),
    "&.Mui-disabled": {
      backgroundColor: theme.palette.background.disabled,
      color: theme.palette.text.primary
    }
  },
  hobby: {
    "& svg": {
      color: theme.palette.text.secondary
    },
    "& .MuiAutocomplete-tag": {
      backgroundColor: theme.palette.background.disabled,
      color: theme.palette.text.primary
    }
  },
  avatarSkeletonContainer: {
    height: 0,
    overflow: "hidden",
    paddingTop: "100%",
    position: "relative"
  },
  avatarLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  // secuirity data
  delete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(8)
    }
  },
  popup: {
    width: "auto !important"
  },
  icon: {
    fontSize: "10px"
  },
  title: {
    fontSize: "1rem !important"
  },
  titleMd: {
    lineHeight: "1.5 !important"
  },
  sweetalertButton: {
    fontSize: `${theme.spacing(1.5)}px !important`
  },
  sweetalertInput: {
    fontSize: "0.875rem !important"
  }
});

export default chatStyles;
