import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%"
  },
  questionfields: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    margin: 11,
    display: "block"
  },
  input: {
    boxShadow: "3px 5px #eeeeee",
    display: "block",
    width: "100%",
    borderRadius: 4,
    border: "1px solid #bdbdbd",
    padding: "10px 15px",
    margin: 10,
    fontSize: 14
  },
  label: {
    lineHeight: 2,
    textAlign: "left",
    display: "block",
    marginBottom: 13,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 200,
    marginLeft: 14,
    fontFamily: "sans-serif"
  },
  button: {
    backgroundColor: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    marginTop: 40,
    padding: 20,
    fontSize: 16,
    fontWeight: 100,
    letterSpacing: 10
  },
  paper: {
    textAlign: "center",
    padding: 12
  }
}));

function UserResponse(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allquestions, setAllQuestions] = useState([]);
  const date = props.match.params.date;

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(`http://localhost:3001/data?date=${date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questions => {
        questions.map(question => {
          queastionsIdArray.push(question.id);
          questionsArray.push(question.questions);
        });
        setQuestionsId(queastionsIdArray);
        setAllQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  return (
    <Card className={classes.container}>
      <CardContent>
        <form>
          <div>
            <Typography variant="h4" component="h4">
              Your Score : {props.location.state["score"]}
            </Typography>
            <Typography variant="h4" component="h4">
              Time : {props.location.state["time"]}
            </Typography>
          </div>
          {Object.keys(props.location.state).map((items, index) => (
            <div>
              {items === "fullname" ? (
                <label className={classes.label}>Full Name</label>
              ) : items === "city" ? (
                <label className={classes.label}>City</label>
              ) : items === "address" ? (
                <label className={classes.label}>Address</label>
              ) : items === "mobile" ? (
                <label className={classes.label}>Mobile</label>
              ) : items === "id" || items === "score" || items === "time" ? (
                ""
              ) : (
                <label className={classes.label}>
                  {index - 3}. {items}
                </label>
              )}
              {items != "id" && items != "score" && items != "time" ? (
                <input
                  className={classes.input}
                  placeholder={props.location.state[items]}
                  name="fullname"
                  ref={register}
                  disabled={true}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </form>
      </CardContent>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link to={`/`}>
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                Home
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/quizresult/${date}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                View all results
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserResponse;
