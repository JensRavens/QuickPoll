import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import { useProfile, updateProfile } from "./model/account";
import { history, lobbyPath, roomPath } from "./model/history";
import { Lobby } from "./components/lobby";
import { RoomPage } from "./components/room";
import { GlobalStyle } from "./components/GlobalStyle";
import { Container } from "./components/Container";
import "./model/socket";

function App(): JSX.Element {
  const profile = useProfile();
  useEffect(() => {
    updateProfile({ name: profile.name, email: profile.email });
  }, []);
  return (
    <Switch>
      <Route component={RoomPage} path={roomPath({ id: ":id" })} exact />
      <Route component={Lobby} path={lobbyPath()} />
    </Switch>
  );
}

const HotApp = hot(() => (
  <Router history={history}>
    <GlobalStyle />
    <Container>
      <App />
    </Container>
  </Router>
));
ReactDOM.render(<HotApp />, document.getElementById("app"));
