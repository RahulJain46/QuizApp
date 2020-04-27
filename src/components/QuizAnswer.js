import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  root :{
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    width: "100%"
  }
});

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0)
];

export default function SimpleTable(props) {
  const classes = useStyles();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsArray = [];
    const date = props.match.params.date;
    fetch(`http://localhost:3001/data?date=${date}`)
      .then(answerJson => {
        return answerJson.json();
      })
      .then(answers => {
        answers.map(answer => {
          questionsArray.push(answer.questions);
        });
        setAnswers(questionsArray);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
    <TableContainer component={Paper}>
      {!loading ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>QUESTIONS</TableCell>
              <TableCell align="right">ANSWER</TableCell>
              <TableCell align="right">REMARKS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map(answer => {
              return answer.map(row => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.question}
                  </TableCell>
                  <TableCell align="right">{row.answer}</TableCell>
                  <TableCell align="right">{row.remark}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      ) : (
        <div className={classes.loading}>
          Loading
          <CircularProgress />
        </div>
      )}
    </TableContainer>
    </div>
  );
}
