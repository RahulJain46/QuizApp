import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { useForm, Controller } from "react-hook-form";
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
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const date = props.match.params.date;
    fetch(`http://localhost:3001/data?date=${date}`)
      .then(questionJson => {
        return questionJson.json();
      })
      .then(questions => {
        setQuestions(questions);
        setLoading(false);
      });
  }, []);

  const onSubmit = data => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div className={classes.container}>
      {questions.length != 0 ? console.log(questions[0]) : ""}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.label}>Example</label>
        <input
          className={classes.input}
          name="example"
          defaultValue="test"
          ref={register}
        />
        <label className={classes.label}>ExampleRequired</label>
        <input
          className={classes.input}
          name="exampleRequired"
          ref={register({ required: true, maxLength: 10 })}
        />
        <fieldset>
          <label>question1</label>
          <input type="checkbox" value="YES" name="question1" ref={register} />
          <input type="checkbox" value="NO" name="question1" ref={register} />
        </fieldset>
        <fieldset>
          <label>question2</label>
          <input type="checkbox" value="YES" name="question2" ref={register} />
          <input type="checkbox" value="NO" name="question2" ref={register} />
        </fieldset>
        {errors.exampleRequired && <p>This field is required</p>}
        <input className={classes.button} type="submit" />
      </form>
    </div>
  );
}

export default QuizForm;
