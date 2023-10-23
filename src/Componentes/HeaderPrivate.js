

const HeaderPrivate = () => {

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        window.location = '/carros'
    }
    return (
        <header className="header">
        <h1>Importadora Orellana</h1>
        <nav className="navigation">
        <ul className="menu">
            <li><a href="/admincar">Carros</a></li>
            <li><a href="/citasadmin">Citas</a></li>
            <li><a onClick={()=> cerrarSesion()}>Cerrar sesión</a></li>
        </ul>
        </nav>
        </header>   
    )
}

export default HeaderPrivate