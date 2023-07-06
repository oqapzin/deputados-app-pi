import NavBar from '../../../components/Navbar'
import CardDeputado from '../../../components/CardDeputado'
import apiDeputados from "../../../services/conectaAPI"
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

export default function Favorites() {
    const [deputados, setDeputados] = useState([])
    const [loading, setLoading] = useState(true)
    const [deputadosFav, setDeputadosFav] = useState([])


    useEffect(() => {
        setDeputadosFav(JSON.parse(window.localStorage.getItem("Favoritos")) ?? [])
    }, [])

    useEffect(() => {
        if (deputadosFav.length > 0) {
            let idsFormatted = ""

            deputadosFav.map((item) => {
                idsFormatted = idsFormatted + "&id=" + item
            })

            idsFormatted = idsFormatted.substring(1)

            getData(idsFormatted)
            setLoading(false)
        }
        setLoading(false)
    }, [deputadosFav])


    async function getData(formattedText) {
        const resultConsult = await apiDeputados.get(`/deputados/?${formattedText}&ordem=ASC&ordenarPor=nome`)
        const resultDeputados = resultConsult.data.dados

        setDeputados(resultDeputados)
    }


    const arrayNull = (teste) => {
        if (teste) setDeputados([])
    }

    return (
        <>
            <NavBar navBarLink={"/"} navBarItem="main">
                {loading ?
                    <div className="d-flex justify-content-center">
                        <CircularProgress sx={{ color: 'black' }} />
                    </div>

                    :
                    deputados.length == 0 ?
                        <div className="py-5 mb-5 mt-5 m-auto" >
                            <Container style={{ marginTop: "4%" }}>
                                <StarIcon sx={{ color: "var(--amarelo)", width: "100%", fontSize: 'clamp(2em, 1em + 3vw,8em)', marginBottom: -3, filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }} />
                                <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>Ainda não há deputados favoritos!</h1>
                                <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>Favorite seus deputados.</h4>
                                <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>
                                    <Link href="/deputados">
                                        <Button variant="contained" sx={{
                                            color: "var(--cinza-texto)",
                                            background: "var(--amarelo)",
                                            border: "3px solid var(--amarelo)",
                                            '&:hover': {
                                                color: "white",
                                                background: "var(--azul-escuro)",
                                                border: "3px solid var(--azul-escuro)",

                                            },
                                        }}>Escolher um deputado</Button>
                                    </Link>
                                </h4>
                            </Container>
                        </div>
                        :
                        <CardDeputado
                            rowMd={6}
                            arrayName={deputados}
                            textCenter="Seus deputados favoritados"
                            isFavoritePage={true}
                            activeFilter={false}
                            favPageIsNull={arrayNull}
                        />
                }
            </NavBar>
        </>
    )
}