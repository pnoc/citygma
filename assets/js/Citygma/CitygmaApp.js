import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import CitygmaHeader from "../Header/CitygmaHeader";
import CitygmaAppContainer from "./CitygmaAppContainer";
import CitygmaLogin from "./Pages/CitygmaLogin";
import CitygmaAbout from "./Pages/CitygmaAbout";
import CitygmaMentions from "./Pages/CitygmaMentions";
import CitygmaProfil from "./Pages/CitygmaProfil";

import { PrivateRoute } from "../auth/components/PrivateRoute";
import { authenticationService } from '../auth/services/authenticationService';
import { history } from "../auth/helpers/history";
import CitygmaAdmin from "./Admin/CitygmaAdmin";

export default class CitygmaApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            htmlElementClicked : null,
            currentUser: null
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { htmlElementClicked } = this.state;
        const { currentUser } = this.state;

        return (
            <Fragment>
                <CitygmaHeader
                    currentUser={currentUser}
                    onLogoutClick={this.logout}
                />
                <Switch>
                    <Route exact path="/"><CitygmaAppContainer/></Route>
                    <Route path="/login">
                        <CitygmaLogin
                            history={this.props.history}
                            onUserCreateSubmit={this.handleUserCreateSubmit}
                            onUserConnectSubmit={this.handleUserConnectSubmit}
                        />
                    </Route>
                    <Route path="/about" component={CitygmaAbout} />
                    <Route path="/Mentions" component={CitygmaMentions} />
                    <PrivateRoute exact path="/profil" component={CitygmaProfil} />
                    <Route path="/adminLogger" component={CitygmaAdmin} />
                </Switch>
            </Fragment>
        )
    }
}