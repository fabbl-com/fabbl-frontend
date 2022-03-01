import React from "react";
import { Typography, Box, FormControl, Grid } from "@material-ui/core";
import { PropTypes } from "prop-types";

const PasswordStrength = ({ level }) => {
  return (
    <FormControl fullWidth>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box
              style={{ backgroundColor: level.color }}
              sx={{ width: 85, height: 8, borderRadius: "7px" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontSize="0.75rem">
              {level?.label}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </FormControl>
  );
};
PasswordStrength.propTypes = {
  level: PropTypes.object.isRequired
};

export default PasswordStrength;
