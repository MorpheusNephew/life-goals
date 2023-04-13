import Header from '../components/header';
import { Outlet } from 'react-router-dom';
import { AppBar, Box, Drawer, Toolbar } from '@mui/material';

const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        More magic
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            marginTop: 5,
          },
        }}
      >
        <Header />
      </Drawer>
      <Box component={'main'} sx={{ flexGrow: 1, p: 5, marginTop: -8 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Root;
