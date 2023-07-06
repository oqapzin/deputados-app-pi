import React from 'react'
import NavBar from '../../../components/Navbar'
import CardDeputado from '../../../components/CardDeputado'
import apiDeputados from '../../../services/conectaAPI'
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Container } from 'react-bootstrap'
import { RiGovernmentLine } from "react-icons/ri";
const detalhesDeputado = ({ name, deputadoDados }) => {


    return (
        <>
            <NavBar
                navBarItem="main"
                title={`Seu deputado - ${name}`}
            >
                {deputadoDados.length == 0 ?
                    <div className="py-5 mb-5 mt-5 m-auto" >
                        <Container style={{ marginTop: "4%" }}>
                            <RiGovernmentLine style={{ color: "var(--amarelo)", width: "100%", fontSize: 'clamp(3em, 1em + 4vw,8em)', marginBottom: -5, filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))" }} />
                            <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>Não encontramos nenhum deputado com nome <span style={{ color:"var(--amarelo)"}}>{name}</span></h1>
                            <h4 className='text-center text-uppercase text-muted font-weight-bold mt-1 pt-3'>PROCURE POR OUTRO NOME.</h4>
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
                                    }}>Ir para deputados</Button>
                                </Link>
                            </h4>
                        </Container>
                    </div>
                    :

                    <CardDeputado
                        rowMd={6}
                        arrayName={deputadoDados}
                        textCenter={name}
                        activeFilter={false}
                    />

                }
            </NavBar>
        </>
    )
}


export default detalhesDeputado

export async function getServerSideProps(context) {
    const name = context.params.nome
    const resultDeputado = await apiDeputados.get(`/deputados/?dataInicio=2014-01-01&nome=${name}&ordem=ASC&ordenarPor=nome`)
    const deputadoDados = resultDeputado.data.dados

    return {
        props: { name, deputadoDados },
    }
}
