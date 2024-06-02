import CourseDetail from './CourseDetail';
import CourseEdit from './EditCourse';
import CreatedCourseMentor from './CreatedCourseMentor';
import CreateCourse from './CreateCourse';
import CourseLayout from './CourseLayout';
import CourseSearch from './CourseSearch';
import LoginRequired from './LoginRequired';

const authenticatedCourse = {
  path: "",
  element: <LoginRequired />,
  children: [
    { path: "create", element: <CreateCourse /> },
    { path: "edit/:id", element: <CourseEdit /> }, 
  ]
}

const courseRoutes =
  {
    path: 'course',
    element: <CourseLayout />,
    children: [
      { path: "search", element: <CourseSearch />},
      { path: "detail/:id", element: <CourseDetail /> },
      { path: "by/:mentorUsername", element: <CreatedCourseMentor /> },
      // { path: "create", element: <CreateCourse /> },
      // { path: "edit/:id", element: <CourseEdit /> },
      authenticatedCourse
    ]
  };

export default courseRoutes;