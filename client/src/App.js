import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";
import NavBar from "./component/NavBar/NavBar";

function App() {
    return (
            <div className="App">
                <NavBar/>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={MainPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/registration' component={RegistrationPage}/>
                    </Switch>
                </BrowserRouter>
            </div>
    );
}

export default App;
