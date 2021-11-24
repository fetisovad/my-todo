import './App.css';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import useRoutes from './routes'
import {AuthContext} from "./context/auth";
import {useAuth} from "./hooks/auth";

function App() {
    const {login, logout, isReady, userId, token} = useAuth()
    const isLogin = !!token
    const routes = useRoutes(isLogin)

    return (
        <AuthContext.Provider value={{login, logout, isReady, userId, token, isLogin}}>
            <div className="App">
                <BrowserRouter>
                    <NavBar/>
                    {routes}
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
