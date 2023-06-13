import './register.css'
import {useNavigate, Link} from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();

    const onSubmit = async (e)=> {
        e.preventDefault()

        const userData = {
            nombre: e.target.name.value,
            apellido: e.target.lastname.value,
            email: e.target.correo.value,
            contrasena: e.target.password.value,
            idRol:2
        };

        try{
            const response = await fetch('http://localhost:4020/api/importadora/registro', {
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
           console.log(data);
            navigate('/')
        }catch(e){
            console.log(e)
        }
        // Realizar la petición a la API utilizando async/await

    }

    return(

       
        <div className="container">
            <h2>Registro</h2>
            
    
        

    <form onSubmit={onSubmit}>
      <input type="text" name='name' placeholder="nombre" />
      <input type="text" name='lastname' placeholder="apellido" />
      <input type="text" name='correo' placeholder="email" />
      <input type="password" name='password' placeholder="Contraseña" />

      <button type="submit">Registrarse</button>
    </form>
    <Link to="/">Login</Link>
  </div>

    )
}

export default Register