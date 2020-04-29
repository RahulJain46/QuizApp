import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { v5 as uuidv5 } from "uuid";
import { TextField } from "formik-material-ui";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  function WarningButton(score) {
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return alert(
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  const onSubmit = (data, ques, quesId) => {
    var myMap = new Map();
    // console.log(data);
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const score = calcaulateScore(ques, myMap);
    const uuid = uuidv5(
      myMap.get("fullname") + myMap.get("mobile"),
      uuidv5.DNS
    );
    const date = props.match.params.date;
    const uuid1 = uuidv5(date, uuidv5.DNS);
    console.log(uuid1);
    const userData = Object.assign(data, { id: uuid, score });
    let userResponseJson = {};
    let userAnswer = [];
    userAnswer.push(userData);
    userResponseJson.date = date;
    userResponseJson.userAnswer = userAnswer;
    userResponseJson.id = uuid1;
    //    userResponseJson.id =
    // console.log(userResponseJson);
    // let userResponseArray =[]
    // let userArray = []
    // let userAnswer ={}
    // for(const key in userData){
    //    userResponseJson["fullname"] = userData["fullname"];
    //    userResponseJson["city"] = userData["city"];
    //    userResponseJson["address"] = userData["address"];
    //    userResponseJson["mobile"] = userData["mobile"];
    //    if(key != "fullname" ||key != "city" ||key != "address" ||key != "mobile"){
    //     userAnswer[key]= userData[key]
    //     userArray.push(userAnswer);
    //    }
    //    userResponseArray.push(userResponseJson)
    //    userResponseArray.push(userResponseJson)

    // }
    let userJson1 = {};
    fetch(`http://localhost:3001/users/e2985cf1-edd5-5a49-938d-2bb63b4f1bcf`)
      .then(userjson => {
        return userjson.json();
      })
      .then(user => {
        console.log(user);
        user.userAnswer[0].push(userData);
        console.log(user);
      });

    // const options = {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(userResponseJson)
    // };
    //fetch(`http://localhost:3001/users/${uuid}`, options).then(res => {
    //return WarningButton(score);
    // history.push(`/yourresponse/${uuid}`);
    // });
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div className={classes.container}>
      <form
        onSubmit={handleSubmit(data => onSubmit(data, questions, questionsId))}
      >
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
