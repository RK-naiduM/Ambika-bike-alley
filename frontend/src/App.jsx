import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'; // <--- Import this
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet /> {/* <--- This is where the Home or Product screen appears */}
        </Container>
      </main>
    </>
  );
};

export default App;