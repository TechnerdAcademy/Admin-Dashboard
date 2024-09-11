import './App.css';
import Layout from './components/Layout/Layout';
import UserList from './pages/UserList/UserList';
import Home from './pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import UserEdit from './pages/UserEdit/UserEdit';
// import NewUser from './pages/NewUser/NewUser';
import ProductList from './pages/ProductList/ProductList';
import Addcourse from './pages/ProductList/addcourse';
import CourseEdit from './pages/ProductList/courseedit';
import TransactionList from './pages/Transaction/TransactionList';
import Login from './pages/Login/Login';
import Teachers from './pages/TeachersList'
import TeachersAdd from './pages/TeachersList/add'
import TeachersEdit from './pages/TeachersList/edit'
import Freecourse from './pages/ProductList/Freecourse'
import FreecourseEdit from './pages/ProductList/FreecourseEdit'
import CourseContent from './pages/ProductList/coursecontent'
import BusinessPackage from './pages/BusinessPackage/index'
import Announcements from './pages/Announcements/add'
import Certificates from './pages/ProductList/certificates'
// import Settings from './pages/Login/index'



function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />, // Ensure the Login page is shown at the root level
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        // {
        //   path: '/login',
        //   element: <Login />, // Add the Login route
        // },
        {
          path: '/users',
          element: <UserList />,
        },
        {
          path: '/teachers',
          element: <Teachers />,
        },
        {
          path: '/addTeacher',
          element: <TeachersAdd />,
        },
        {
          path: '/editTeacher',
          element: <TeachersEdit />,
        },

        // {
        

        // {
        //   path: '/newUser',
        //   element: <NewUser />,
        // },
        // {
        //   path: '/user/:userId',
        //   element: <UserEdit />,
        // },
        {
          path: '/course',
          element: <ProductList />,
        },
        {
          path: '/course/content/:id?',
          element: <CourseContent/>,
        },
        {
          path: '/free-courses',
          element: <Freecourse />,
        },
        {
          path: '/course/free/:id?',
          element: <FreecourseEdit />,
        },
        {
          path: '/addCourse',
          element: <Addcourse />,
        },
        {
          path: '/course/edit/:courseId',
          element: <CourseEdit />,
        },
        {
          path: '/transactions',
          element: <TransactionList />,
        },
        {
          path: '/course/certificates/:id?',
          element: <Certificates />,
        },
        {
          path: '/business',
          element: <BusinessPackage  />,
        },
        {
          path: '/announcements',
          element: <Announcements  />,
        },
        // {
        //   path: '/settings',
        //   element: <Settings />,
        // },
      ]
    },
  ]);
  return (
    <>
    <RouterProvider router={router} />
    

    </>
  );
}

export default App;
