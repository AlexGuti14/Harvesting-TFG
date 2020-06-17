import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.css";
import history from "./history";
import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'

registerLocale('es', es)


export default () => {
  return (

      <Router basename={""}>
              <Switch>
                {routes().map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      history={history}
                      component={(props) => {
                        return (
                          <route.layout {...props}>
                            <route.component {...props}/>
                          </route.layout>
                        );
                      }
                      }
                    />
                  );
                })}
              </Switch>
    </Router>

)}
;
