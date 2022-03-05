import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
import CoursesMenu from "./pages/CoursesMenu";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
// import About from "./components/about";
import Header from "./components/header";
import About from "./components/about";
import AllNews from "./components/AllNews";

import Activate from "./pages/Activate";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import { Provider } from "react-redux";
import store from "./store";
import AllEvents from "./components/AllEvents";
import GraduatePage from "./components/GraduatePage";


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/signup"} exact component={Signup} />
            <Route path={"/login"} exact component={LoginForm} />
            <Route path={"/reservation"} exact component={ReservationForm} />
            <Route path={"/coursesMenu"} exact component={CoursesMenu} />
            <Route path={"/coursesPage"} exact component={CoursesPage} />
            <Route path={"/courseDetails/:id"} exact component={CourseDetails} />
            <Route path={"/about"} exact component={About} />
            <Route path={"/reset-password"} exact component={ResetPassword} />
            <Route path={"/allnews"} exact component={AllNews} />
            <Route path={"/allevents"} exact component={AllEvents} />
            <Route path={"/graduatepage"} exact component={GraduatePage} />

            <Route
              path={"/password/reset/confirm/:uid/:token"}
              exact
              component={ResetPasswordConfirm}
            />
            <Route path={"/activate/:uid/:token"} exact component={Activate} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
