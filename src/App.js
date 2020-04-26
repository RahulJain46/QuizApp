import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home/Home";
import OldQuiz from "./components/OldQuiz";
import QuizForm from "./components/QuizForm";
import QuizAnswers from "./components/QuizAnswers";
import QuizAnswer from "./components/QuizAnswer";
import LogIn from "./components/SignIn/SignIn";
import LogOut from "./components/SignOut/SignOut";
import FortDetailPage from "./components/FortDetailPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/oldquizresults" component={OldQuiz} />
        <Route path="/datemonthquiz" component={QuizForm} />
        <Route path="/datemonthresult" component={OldQuiz} />
        <Route path="/answerSheets" component={QuizAnswers} />
        <Route path="/answerSheet" component={QuizAnswer} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
