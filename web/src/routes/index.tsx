import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './home';
import Root from './root';
import Goals from './goals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'goals',
        element: <Goals />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
