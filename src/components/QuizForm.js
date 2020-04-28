import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { v5 as uuidv5 } from "uuid";
import { TextField } from "formik-material-ui";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { fontSize, letterSpacing } from "@material-ui/system";
const leftproportion = "41%";

const useStyles = makeStyles(theme => ({
  container: {
    top: 176,
    position: "absolute",
    left: leftproportion,
    maxWidth: 500,
    margin: "0 auto"
  },
  input: {
    display: "block",
    box: "border - box",
    width: "100%",
    borderRadius: 4,
    border: "1px solid white",
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
    fontWeight: 200
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
  }
}));

function QuizForm(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsArray = [];
    const date = props.match.params.date;
    fetch(`http://localhost:3001/data?date=${date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questions => {
        questions.map(question => {
          questionsArray.push(question.questions);
        });
        setQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  const calcaulateScore = (rightAns, userAns) => {
    let score = 0;
    rightAns.map(answers => {
      answers.map(answer => {
        if (userAns.get(answer.question) === answer.answer) {
          score++;
        }
      });
    });
    return score;
  };

  const onSubmit = (data, ques) => {
    var myMap = new Map();
    console.log(data);
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const score = calcaulateScore(ques, myMap);
    const uuid = uuidv5(
      myMap.get("fullname") + myMap.get("mobile"),
      uuidv5.DNS
    );
    const userData = Object.assign(data, { id: uuid, score });
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    };
    fetch("http://localhost:3001/users", options).then(res => {
      alert("Your score is : " + score);
      history.push(`/yourresponse/${uuid}`);
    });
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(data => onSubmit(data, questions))}>
        <label className={classes.label}>Full Name</label>
        <input
          className={classes.input}
          placeholder="Full Name"
          name="fullname"
          ref={register}
        />
        <label className={classes.label}>CITY/TOWN/VILLAGE</label>
        <input
          className={classes.input}
          name="city"
          ref={register({ required: true })}
        />
        <label className={classes.label}>Address In Short</label>
        <input
          className={classes.input}
          placeholder="Address"
          name="address"
          ref={register}
        />
        <label className={classes.label}>Mobile No.</label>
        <input
          className={classes.input}
          placeholder="Mobile Number"
          name="mobile"
          ref={register}
        />
        {questions.map(question => {
          return question.map(row => (
            <fieldset>
              <label>{row.question}</label>
              <input
                type="radio"
                value="YES"
                name={row.question}
                ref={register}
                label="YES"
              />
              <label>YES</label>
              <input
                type="radio"
                value="NO"
                name={row.question}
                ref={register}
              />
              <label>NO</label>
            </fieldset>
          ));
        })}
        {errors.exampleRequired && <p>This field is required</p>}
        <input className={classes.button} type="submit" />
      </form>
    </div>
  );
}

export default QuizForm;
