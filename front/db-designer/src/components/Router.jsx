import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './screens/Login/Login';
import ResetPassword from './screens/ResetPassword/ResetPassword';
import Signup from './screens/Signup/Signup';
import Home from './screens/Home/Home';
import ResetPasswordConfirm from './screens/ResetPasswordConfirm/ResetPasswordConfirm';
import Activate from './screens/Activate/Activate';
import Logout from './screens/Logout/Logout';
import CreateProject from './screens/CreateProject/CreateProject';
import UserProjects from './screens/UserProjects/UserProjects';
import ProjectTables from './screens/ProjectTables/ProjectTables';
import Layout from '../hocs/Layout';

const Router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route element={<Home />} path='/'/>
                        <Route element={<ResetPassword />} path='/reset-password'/>
                        <Route element={<Login />} path='/login'/>
                        <Route element={<Signup />} path='/signup'/>
                        <Route element={<Logout />} path='/logout'/>
                        <Route exact element={<ResetPasswordConfirm />} path='/password/reset/confirm/:uid/:token'></Route>
                        <Route element={<Activate />} path='/activate/:uid/:token'></Route>
                        <Route element={<UserProjects />} path='/user-projects'></Route>
                        <Route element={<CreateProject />} path='/create-project'></Route>
                        <Route element={<ProjectTables />} path='/project-tables/:project_id'></Route>

                        <Route path='*' element={<div>Not Found</div>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </Provider>
    )
}


export default Router;