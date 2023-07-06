import NavBar from '../../components/Navbar'
import CardDeputado from '../../components/CardDeputado'
import apiDeputados from "../../services/conectaAPI"


export default function Home({ Deputados }) {
    return (
        <>
            <NavBar
                navBarItem="main"
            >
                <CardDeputado
                    rowMd={6}
                    arrayName={Deputados}
                    textCenter="Listagem dos Deputados"
                />
            </NavBar>
        </>
    )
}

export async function getServerSideProps() {
    const resultadoDeputados = await apiDeputados.get('/deputados?ordem=ASC&ordenarPor=nome')
    const Deputados = resultadoDeputados.data.dados

    return {
        props: { Deputados },
    }
}