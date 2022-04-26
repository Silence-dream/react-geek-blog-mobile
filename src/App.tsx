import './App.scss';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from '@/pages/Layout';
import Login from '@/pages/Login';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          {/*https://v5.reactrouter.com/web/api/Route/render-func*/}
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          <Route path={'/home'} component={Layout}></Route>
          <Route path={'/login'} component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
