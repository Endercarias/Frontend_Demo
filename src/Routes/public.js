import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const Public = ({ component: Component, ...rest }) => {

  const userLogged = localStorage.getItem('token')

  if ( userLogged ) {
    return <Navigate to="/" />
  }
  return <Route {...rest} component={Component} />
  
}

export default Public