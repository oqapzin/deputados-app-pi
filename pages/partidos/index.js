import NavBar from '../../components/Navbar'
import CardPartidos from '../../components/CardPartidos'
import apiDeputados from "../../services/conectaAPI"


export default function Home({ Partidos }) {
    return (
        <>
            <NavBar
                navBarItem="main"
                seachPage="partidos"
                title="Seu deputado - Partidos"
            >
                <CardPartidos
                    arrayName={Partidos}
                />
            </NavBar>
        </>
    )
}

export async function getServerSideProps() {
    const resultPartidos = await apiDeputados.get('/partidos?itens=40&ordem=ASC&ordenarPor=nome')
    const Partidos = resultPartidos.data.dados
    
    return {
        props: { Partidos },
    }
}