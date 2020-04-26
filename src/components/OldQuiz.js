import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}));

function OldQuiz() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dateArray = [];
    fetch("http://localhost:3001/data")
      .then(questionJson => {
        return questionJson.json();
      })
      .then(questions => {
        questions.map(question => {
          dateArray.push(question.date);
        });
        setDates(dateArray);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              OLD QUIZ , RESULTS & ANSWER SHEETS
            </Typography>
          </Paper>
        </Grid>
        {dates.length != 0 && !loading ? (
          dates.map(date => (
            <div>
              <Grid item xs={12}>
                <Link to={`/answersheet` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" color="secondary">
                      JAIN QUIZ {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link to={`/answersheet` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" color="secondary">
                      QUIZ RESULT {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
            </div>
          ))
        ) : (
          <div className={classes.loading}>
            Loading
            <CircularProgress />
          </div>
        )}
      </Grid>
    </div>
  );
}

export default OldQuiz;
