import React, { useEffect, useState } from "react";
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

function QuizAnswers() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);

  async function fetchQuestions() {
    const questions = await fetch("http://localhost:3001/data");
    console.log(questions.json());
    return questions.json();
  }

  useEffect(() => {
    const dateArray = [];

    debugger;
    fetchQuestions().then(questionJson => {
      questionJson.map(question => {
        dateArray.push(question.date);
      });
    });
    setDates(dateArray);
  }, [dates]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              ANSWER SHEETS
            </Typography>
          </Paper>
        </Grid>
        {dates.length != 0
          ? dates.map(date => {
              console.log(date);
            })
          : ""}
        <Grid item xs={4}>
          <Link to="/answerSheet">
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                DATE-25-APR
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Button variant="contained" color="secondary">
              DATE-25-APR
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Button variant="contained" color="secondary">
              DATE-25-APR
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuizAnswers;
