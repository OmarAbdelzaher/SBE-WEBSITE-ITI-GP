
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import NavBar from "./components/nav-bar";
// import Form from './components/Form';



function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <h1>Hello</h1>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>ALOOOOOOOOOOOOOOOOOOOOO</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
=======
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
>>>>>>> 27eb928ad64821dc42abb652a6a8f225a57841cd
  );
}
export default App;
