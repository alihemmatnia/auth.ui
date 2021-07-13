import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./Route/ProtectedRoute";
import Login from "./Account/Login";
import Register from "./Account/Register";

import Home from "./Home";
import AddPost from "./Account/AddPost";
import { ToastProvider } from "react-toast-notifications";
import ForGotPassword from "./Account/ForGotPassword";

function App() {
  return (
    <ToastProvider
      placement="bottom-left"
      autoDismiss={true}
      autoDismissTimeout={3000}
    >
      <Router>
        <Switch>
          <Route exact path="/forgot" component={ForGotPassword}>
            <ForGotPassword />
          </Route>
          <Route exact path="/login" component={Login}>
            <Login />
          </Route>
          <Route exact path="/register" component={Register}>
            <Register />
          </Route>
          <ProtectedRoute exact path="/" children={<Home />}>
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path="/add" children={<AddPost />}>
            <AddPost />
          </ProtectedRoute>

          <Route path="*">
            <Redirect from="/" to="/" />
          </Route>
        </Switch>
      </Router>
    </ToastProvider>
  );
}

export default App;
