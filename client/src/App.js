/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Delete from "./components/Delete";

import Header from './components/Header';
import UserSignOut from './components/UserSignOut';

import Forbidden from './components/Forbidden'
import NotFound from './components/NotFound';
import Authenticated from './components/Authenticated';


import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const DeleteCourseWithContext = withContext(Delete);

const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);


const AuthWithContext = withContext(Authenticated);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />       
        <Route exact path="/courses/:id" component={CourseDetailsWithContext} />
        <PrivateRoute exact path="/courses/:id/delete" component={DeleteCourseWithContext} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden"component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);