
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
 import './App.css';
 import Home from './pages/home/home';
 import Login from './pages/login/login';
 import Register from './pages/register/register';
 import Carros from './pages/carros/carros';
 import Price from './pages/price/price';

 function App() {

   const userLogged = localStorage.getItem('token') 
 const rolLocal = localStorage.getItem('rol')


  return (
    <BrowserRouter>
   <Routes>
       <Route path='/' element={<Login/>} exact  /> 
     <Route  path='/home' element={<Home userLogged ={userLogged} />}  exact />
      <Route  path='/register' element={<Register/>} exact />
     <Route path='/carros' element={<Carros userLogged ={userLogged} />} exact  />
     <Route path='/price/:idCarro' element={<Price userLogged ={userLogged} />} exact  />
   </Routes>
   </BrowserRouter>
 );
 }

export default App;


