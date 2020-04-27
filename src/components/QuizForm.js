import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Grid } from "@material-ui/core";
const leftproportion = "41%";


const useStyles = makeStyles(theme => ({
  container: {
    top: 176,
    position: "absolute",
    left: leftproportion
  }
}));

const QuizForm = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className="form">
        <Typography variant="h4" gutterBottom>
          Date 25th April 2020
        </Typography>
        <Typography variant="h6" gutterBottom>
          * Required
        </Typography>
        <Formik>
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Grid item container xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    FULL NAME OF PARTICIPANT
                  </Typography>
                </Grid>

                <Grid container xs={12}>
                  <Field
                    name="fullname"
                    placeholder="Full Name"
                    component={TextField}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item container xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    CITY/TOWN/VILLAGE
                  </Typography>
                </Grid>

                <Grid container xs={12}>
                  <Field name="city" placeholder="CITY" component={TextField} />
                </Grid>
              </Grid>{" "}
              <Grid item xs={12}>
                <Grid item container xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    ADDRESS IN SHORT
                  </Typography>
                </Grid>

                <Grid container xs={12}>
                  <Field
                    name="address"
                    placeholder="Address"
                    component={TextField}
                  />
                </Grid>
                <Grid container xs={12}>
                  <Grid item container xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Mobile Number
                    </Typography>
                  </Grid>
                  <Field
                    name="mobolenumber"
                    placeholder="Mobile NUmber"
                    component={TextField}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default QuizForm;
