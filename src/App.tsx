import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout';
import { Form } from './Form';
import { Home } from './Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout/>}>
              <Route index element={<Home />}/>
              <Route path='form' element={<Form/>}/>
          </Route>
        </Routes>

      </BrowserRouter>
  );
}

export default App;
