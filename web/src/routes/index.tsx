import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home, { loader as homeLoader } from './home';
import Root from './root';
import Goals from './goals';
import Goal from './goal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: 'goals',
        element: <Goals />,
      },
      {
        path: 'goals/new',
        element: <Goal />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
