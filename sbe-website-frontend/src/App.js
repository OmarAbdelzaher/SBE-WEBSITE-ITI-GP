import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
import CoursesMenu from "./pages/CoursesMenu";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
// import About from "./components/about";
import Header from "./components/header";
// import Footer from "./components/footer";



function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/signup"} exact component={SignupForm} />
        <Route path={"/login"} exact component={LoginForm} />
        <Route path={"/reservation"} exact component={ReservationForm} />
        <Route path={"/coursesMenu"} exact component={CoursesMenu} />
        <Route path={"/coursesPage"} exact component={CoursesPage} />
        <Route path={"/courseDetails"} exact component={CourseDetails} />
        {/* <Route path={"/about"} exact component={About} /> */}
        {/* <Route path={"/contact"} exact component={Footer} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
