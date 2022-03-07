import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
import CoursesMenu from "./pages/CoursesMenu";
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
import CourseHistory from "./pages/CourseHistory";
import AllEvents from "./components/AllEvents";
import GraduatePage from "./components/GraduatePage";
import UnderGraduate from "./components/UnderGraduate";
import CourseGraduate from "./components/CourseGraduate";
import CourseUnderGraduate from "./components/CourseUndergraduate";
import Profile from "./pages/Profile";
import YoneSone from "./pages/Y1S1";
import YoneStwo from "./pages/Y1S2";
// import YearTwo from "./pages/Y2S1";
import YtwoSone from "./pages/Y2S1";
import YtwoStwo from "./pages/Y2S2";
import YthreeSone from "./pages/Y3S1";
import YthreeStwo from "./pages/Y3S2";
import YfourSone from "./pages/Y4S1";
import YfourStwo from "./pages/Y4S2";
import Layout from './hocs/Layout'; 
import ReservationSchedule from "./components/ReservationSchedule";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
        <Layout>
          <Header/>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={"/signup"} exact component={Signup} />
            <Route path={"/login"} exact component={LoginForm} />
            <Route path={"/reservation"} exact component={ReservationForm} />
            <Route path={"/coursesMenu"} exact component={CoursesMenu} />
            <Route path={"/course-history/:id"} exact component={CourseHistory} />
            <Route path={"/courseDetails/:id"} exact component={CourseDetails} />
            <Route path={"/about"} exact component={About} />
            <Route path={"/reset-password"} exact component={ResetPassword} />
            <Route path={"/allnews"} exact component={AllNews} />
            <Route path={"/allevents"} exact component={AllEvents} />
            <Route path={"/graduatepage"} exact component={GraduatePage} />
            <Route path={"/undergraduatepage"} exact component={UnderGraduate} />
            <Route path={"/coursegraduate"} exact component={CourseGraduate} />
            <Route path={"/courseungraduate"} exact component={CourseUnderGraduate} />
            <Route path={"/profilepage"} exact component={Profile} />
            <Route path={"/one-smesterone"} exact component={YoneSone} />
            <Route path={"/one-smestertwo"} exact component={YoneStwo} />
            <Route path={"/two-smesterone"} exact component={YtwoSone} />
            <Route path={"/two-smestertwo"} exact component={YtwoStwo} />
            <Route path={"/three-smesterone"} exact component={YthreeSone} />
            <Route path={"/three-smestertwo"} exact component={YthreeStwo} />
            <Route path={"/four-smesterone"} exact component={YfourSone} />
            <Route path={"/four-smestertwo"} exact component={YfourStwo} />


            <Route path={"/reservationsShedule"} exact component={ReservationSchedule} />

            <Route
              path={"/password/reset/confirm/:uid/:token"}
              exact
              component={ResetPasswordConfirm}
              />
            <Route path={"/activate/:uid/:token"} exact component={Activate} />
            
          </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
