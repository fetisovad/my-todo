import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainPage from "./pages/MainPage/MainPage";
import NavBar from "./component/NavBar/NavBar";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";

function App() {
    const {login, logout} = useAuth()

    return (
        <AuthContext.Provider value={{login, logout}}>
            <div className="App">
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route path='/' exact component={MainPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/registration' component={RegistrationPage}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
