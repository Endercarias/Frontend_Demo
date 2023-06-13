import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const Protected = ({ component: Component, rol: string, ...rest }) => {

  const userLogged = localStorage.getItem('token')
  const rolLocal = localStorage.getItem('rol')


  if( !rolLocal || rolLocal === 'user' ){
    return <Navigate to="/home" />
  }

  if ( !userLogged ) {
    return <Navigate to="/login" />
  }
  return <Route {...rest} element={Component} />
  
}

export default Protected