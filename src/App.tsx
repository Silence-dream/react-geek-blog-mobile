import './App.scss';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
import ProfileEdit from '@/pages/Profile/Edit';
import { customHistory } from '@/utils/history';
function App() {
  return (
    <div className="app">
      <Router history={customHistory}>
        <Switch>
          {/*https://v5.reactrouter.com/web/api/Route/render-func*/}
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          <Route path={'/home'} component={Layout}></Route>
          <Route path={'/login'} component={Login}></Route>
          <Route path="/profile/edit">
            <ProfileEdit></ProfileEdit>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
