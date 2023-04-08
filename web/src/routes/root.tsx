import Header from '../components/header';
import { Outlet } from 'react-router-dom';

const Root = () => {
  

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
