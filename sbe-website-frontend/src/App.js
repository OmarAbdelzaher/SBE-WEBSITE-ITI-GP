
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import NavBar from "./components/nav-bar";
// import Form from './components/Form';



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Switch>
        {/* <Form/> */}
        <Route path={"/"} exact component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
