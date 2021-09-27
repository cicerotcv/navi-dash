import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Home } from "../pages/home";
import { PrivateRoute } from "./PrivateRoute";

export function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}
