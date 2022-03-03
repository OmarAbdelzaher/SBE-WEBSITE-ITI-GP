import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ReservationForm from "./pages/ReservationForm";
// import News from "./components/News";
// import Events from "./components/Events";
// import Academics from "./components/Academics"
// import Counter from './components/Counter';

// import About from "./components/about";



function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/signup"} exact component={SignupForm} />
        <Route path={"/login"} exact component={LoginForm} />
        <Route path={"/reservation"} exact component={ReservationForm} />
        {/* <Route path={"/news"} exact component={News} />
        <Route path={"/events"} exact component={Events} />

        <Route path={"/academics"} exact component={Academics} /> */}
        {/* <Route path={"/counter"} exact component={Counter} /> */}



        {/* <Route path={"/about"} exact component={About} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
