import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeLinks } from './NavLinks';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Page404 from '../components/pages/Page404';
import UserPrivateRouter from '../services/UserPrivateRouter';
import Dashboard from '../components/pages/dashboard/Dashboard';
import EditProfile from '../components/pages/profile/EditProfile';
import ChangePassword from '../components/pages/profile/ChangePassword';
import CreateTodo from '../components/pages/todos/CreateTodo';
import EditTodo from '../components/pages/todos/EditTodo';
import ShowTodo from '../components/pages/todos/ShowTodo';

export default function Routes() {
    return (
        <Switch>
            <Route exact path={routeLinks.login} component={Login} />
            <Route exact path={routeLinks.signUp} component={SignUp} />

            {/* private routes */}
            <UserPrivateRouter exact path={routeLinks.index} component={Dashboard} />
            <UserPrivateRouter exact path={routeLinks.editProfile} component={EditProfile} />
            <UserPrivateRouter exact path={routeLinks.changePassword} component={ChangePassword} />
            <UserPrivateRouter exact path={routeLinks.todos.create} component={CreateTodo} />
            <UserPrivateRouter exact path={`${routeLinks.todos.show}/:id`} component={ShowTodo} />
            <UserPrivateRouter exact path={`${routeLinks.todos.show}/:id/edit`} component={EditTodo} />

            {/* 404 page */}
            <Route component={Page404} />
        </Switch>
    )
}