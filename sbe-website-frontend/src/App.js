import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Form from './components/Form';
// import About from "./components/about";



function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/signup"} exact component={Form} />
        {/* <Route path={"/login"} exact component={} /> */}
        {/* <Route path={"/about"} exact component={About} /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
