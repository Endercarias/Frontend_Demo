import './login.css'
import {useNavigate, Link, useParams} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const {idCarro} = useParams()
    if(token != undefined){
        window.location = `/citas/${idCarro}`
    }

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
            console.log(data);
            status: false
            */
        if(data.status){
            localStorage.setItem('token', data.token)
         sessionStorage.setItem('userId', data.idUsuario)
         sessionStorage.setItem('rol', data.rol)
         
         if(data.rol === 1){
             window.location = '/admincar'
         }else{
             console.log(idCarro)
             if(idCarro != undefined){
                 window.location = `/citas/${idCarro}`
             }else{
                 window.location = `/carros`
             }
         }
        }else{
            alert(data.Message)
        }
        }catch(e){
            console.log(e)
        }

    }

    return(
        <div className="container1">
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