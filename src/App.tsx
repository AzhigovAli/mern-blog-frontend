import Container from '@mui/material/Container';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe } from './redux/slices/auth';
import { useAppDispatch } from './redux/store';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
