import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            26/04/2020 की क्विज का मुख्य विषय "तीर्थंकरों के नाम व चिन्ह" रहेगा।
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Link to="/datemonthquiz">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                JAIN QUIZ DATE-25-APR
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/datemonthresult">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                QUIZ RESULT - DATE-25 APR
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                OLD QUIZ , RESULTS & ANSWER SHEETS
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
