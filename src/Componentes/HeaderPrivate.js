

const HeaderPrivate = () => {

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        window.location = '/carros'
    }

    const token = localStorage.getItem('token')
    const rol = sessionStorage.getItem('rol')

    return (
        <header className="header">
        <h1>Importadora Orellana</h1>
        <nav className="navigation">
        <ul className="menu">
            {
                token != undefined && rol == '1'
                ?<>
                    <li><a href="/admincar">Carros</a></li>
                    <li><a href="/citasadmin">Citas</a></li>
                    <li><a onClick={()=> cerrarSesion()}>Cerrar sesión</a></li>
                </>
                :""
            }
        </ul>
        </nav>
        </header>   
    )
}

export default HeaderPrivate