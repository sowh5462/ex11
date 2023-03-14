import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Join from './Components/Join';
import Login from './Components/Login';
import Mypage from './Components/Mypage';
import Users from './Components/Users';


function App() {
    return (
        <div className="App">
            <Header/>

            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/login" component={Login}/>
                <Route path="/join" component={Join}/>
                <Route path="/mypage" component={Mypage}/>
                <Route path="/users" component={Users}/>
            </Switch>
        </div>
    );
}

export default App;
