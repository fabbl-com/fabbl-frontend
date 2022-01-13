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
    marginTop: theme.spacing(2)
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12)
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
    justifyContent: "space-between",
    width: "100%"
  },
  button: {
    borderColor: theme.palette.text.secondary,
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
  }
});

export default chatStyles;
