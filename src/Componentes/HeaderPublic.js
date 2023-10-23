const HeaderPublic = () => {

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        window.location = '/carros'
    }
    const token = localStorage.getItem('token')
    return (
        <header className="header">
        <h1>Importadora Orellana</h1>
        <nav className="navigation">
        <ul className="menu">
            <li><a href="/carros">Carros</a></li>
            {
                token != undefined
                ? ""
                : <li><a href="/">Iniciar Sesión</a></li>
            }

            {
                token != undefined
                ? <li><a href="/viewcita">Citas</a></li>
                : ""
            }
            {
                token != undefined
                ? <li><a onClick={() =>cerrarSesion()}>Cerrar sesión</a></li>
                : ""
            }
        </ul>
        </nav>
        </header>   
    )
}

export default HeaderPublic