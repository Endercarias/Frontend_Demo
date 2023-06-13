import './login.css'
import {useNavigate, Link} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const onSubmit = async (e)=> {
        e.preventDefault()

        const userData = {
            email: e.target.user.value,
            contrasena: e.target.password.value
        };

        try{
            const response = await fetch('http://localhost:4020/api/importadora/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        
            const data = await response.json();
            // Aquí puedes trabajar con la respuesta de la API

            /*
            if(!data.isError){
                console.log(data);
                alert(data.message)
                return
            }
            */
           localStorage.setItem('token', data.token)
           console.log(data);
           window.location = '/home'
        }catch(e){
            console.log(e)
        }

    }

    return(
        <div className="container">
    <h2>Iniciar sesión</h2>


    <form onSubmit={onSubmit}>
      <input type="text" name='user' placeholder="email" />
      <input type="password" name='password' placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
    <Link to="/register">Register</Link>
  </div>
    )
}

export default Login