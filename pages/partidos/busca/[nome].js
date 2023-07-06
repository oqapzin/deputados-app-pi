import React from 'react'
import Link from 'next/link';
import apiDeputados from '../../../services/conectaAPI'
import CardPartidos from '../../../components/CardPartidos';
import NavBar from '../../../components/Navbar'
import Button from '@mui/material/Button';
import { Container } from 'react-bootstrap'
import { RiGovernmentLine } from "react-icons/ri";


const detalhesPartido = ({ name, partidoDados }) => {
    return (
        <>
            <NavBar
                navBarItem="main"
                seachPage="partidos"
                title={`Seu deputado - ${name}`}

            >
                {partidoDados.length == 0 ?
                    <div className="py-5 mb-5 mt-5 m-auto" >
                        <Container style={{ marginTop: "4%" }}>
                            <RiGovernmentLine style={{ color: "var(--amarelo)", width: "100%", fontSize: 'clamp(3em, 1em + 4vw,8em)', marginBottom: -5, filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }} />
                            <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>Não encontramos nenhum partido com nome <span style={{ color: "var(--amarelo)" }}>{name}</span></h1>
                            <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>PROCURE POR OUTRO NOME.</h4>
                            <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>
                                <Link href="/partidos">
                                    <Button variant="contained" sx={{
                                        color: "var(--cinza-texto)",
                                        background: "var(--amarelo)",
                                        border: "3px solid var(--amarelo)",
                                        '&:hover': {
                                            color: "white",
                                            background: "var(--azul-escuro)",
                                            border: "3px solid var(--azul-escuro)",

                                        },
                                    }}>Ir para partidos</Button>
                                </Link>
                            </h4>
                        </Container>
                    </div>
                    :

                    <CardPartidos
                        arrayName={partidoDados}
                    />

                }
            </NavBar>
        </>
    )
}


export default detalhesPartido

export async function getServerSideProps(context) {
    const name = context.params.nome
    const resultPartido = await apiDeputados.get(`/partidos/?dataInicio=2014-01-01&sigla=${name}&ordem=ASC&ordenarPor=nome`)
    const partidoDados = resultPartido.data.dados

    return {
        props: { name, partidoDados },
    }
}