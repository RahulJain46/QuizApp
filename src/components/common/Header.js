import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles(theme => ({
  navlinks: {
    top: 18,
    position: "relative"
  },
  navheader: {
    position: "relative",
    padding: 30
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

const Header = () => {
  const classes = useStyles();
  const activeStyle = { color: "#F15B2A" };
  return (
    <div className="header">
      <nav className={classes.navlinks}>
        <NavLink
          to="/"
          activeStyle={activeStyle}
          exact
          className={classes.navheader}
        >
          Home
        </NavLink>
        {" | "}
        <NavLink
          to="/oldquizresults"
          activeStyle={activeStyle}
          className={classes.navheader}
        >
          Old Quiz & Result
        </NavLink>
        {" | "}
        <NavLink
          to="/answerSheets"
          activeStyle={activeStyle}
          className={classes.navheader}
        >
          Answer Sheets
        </NavLink>
      </nav>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" gutterBottom>
                UJJAIN JAIN QUIZ PORTAL
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 10:00 AM
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Header;