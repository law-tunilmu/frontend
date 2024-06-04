import ForumLayout from './component/ForumLayout';
import ForumAllQuestions from './component/ForumAllQuestions';

const forumRoutes =
  {
    path: 'forum',
    element: <ForumAllQuestions/>,
    children: [
      { path: "questions/", element: <ForumAllQuestions />},
      // { path: "questions/:id", element: <ForumQuestionsDetail />},
    ]
  };

export default forumRoutes;