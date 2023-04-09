import Header from '../components/header';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, Toolbar } from '@mui/material';

const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        Hello
      </Drawer>
      <Box component={'main'} sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
