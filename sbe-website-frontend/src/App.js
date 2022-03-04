import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
import Header from "./components/header";
import About from "./components/about";
import AllNews from "./components/AllNews";


function App() {
  return (
    <>
      <BrowserRouter>
      <Header   />
        <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/signup"} exact component={SignupForm} />
        <Route path={"/login"} exact component={LoginForm} />
        <Route path={"/reservation"} exact component={ReservationForm} />
        <Route path={"/about"} exact component={About} />
        <Route path={"/allnews"} exact component={AllNews} />

        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
