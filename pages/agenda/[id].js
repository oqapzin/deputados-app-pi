import apiDeputados from "../../services/conectaAPI"
import Tag from "../../components/Tags"
import NavBar from "../../components/Navbar"
import Button from '@mui/material/Button';
import { CardContent, Grid } from "@mui/material"
import { Container, Accordion, Row, Col } from "react-bootstrap"
import { AiFillYoutube } from "react-icons/ai"
import { useRouter } from 'next/router';


const detalheseventos = ({ eventosDados, eventoId }) => {
    const router = useRouter();


    return (
        <>
            <NavBar
                navBarItem="main"
                title={eventosDados.descricaoTipo}
            >
            </NavBar>
            <Container>
                <CardContent sx={{ mb: 10, borderRadius: "4px", padding: 0, boxShadow: "0 4px 6px rgba(10,10,10,.1), 0 0 0 2px rgba(10,10,10,.1)" }}>
                    <div style={{ fontWeight: 500, fontFamily: "spen Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;", boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: "linear-gradient( 109.6deg, rgba(255, 255, 255,1) 20.8%, var(--amarelo) 91.1% )", padding: 10 }}>
                        <div className='text-center text-uppercase mb-5'>
                            <h1 style={{ fontSize: 60 }}> {eventosDados.descricaoTipo}</h1>
                        </div>

                        <Grid sx={{ ml: 4, display: "flex", flexDirection: "column" }}>

                            <Tag
                                Islabel="Comissão:"
                                value={eventosDados['orgaos']['0'].nome}
                                blue
                            />

                            <Tag
                                Islabel="Data de inicio:"
                                value={eventosDados.dataHoraInicio.split("T")[0]}
                                blue
                            />
                            <Tag
                                Islabel="Data de encerramento:"
                                value={eventosDados.dataHoraFim.split("T")[0]}
                                blue
                            />
                            <Tag
                                Islabel="Requerimento:"
                                value={eventosDados['requerimentos']['0'].titulo}
                                blue
                            />
                            <Tag
                                Islabel="Assunto:"
                                value={eventosDados['orgaos']['0'].apelido}
                                blue

                            />
                            <Tag
                                Islabel="Sigla Comissão:"
                                value={eventosDados['orgaos']['0'].sigla}
                                blue
                            />
                        </Grid>
                        <Grid sx={{ ml: 4, display: "flex", flexDirection: "column" }}>
                            <Tag
                                Islabel="Situação:"
                                value={eventosDados.situacao}
                                blue
                            />
                            <Tag
                                Islabel="local:"
                                value={eventosDados.localCamara.nome}
                                blue
                            />
                        </Grid>
                    </div>
                </CardContent>
                <Row>
                    <Col>
                        <iframe style={{ boxShadow: '0 6px 6px rgba(10,10,10,.1), 0 0 0 4px rgba(10,10,10,.1)' }} id="ytplayer" type="text/html" width="85%" height="360px"
                            src={eventosDados.urlRegistro ? "https://www.youtube.com/embed/" + eventosDados.urlRegistro.substring(eventosDados.urlRegistro.lastIndexOf("=") + 1) : "https://www.youtube.com/embed/fj6vwqa-gmc"}
                            frameborder="0"
                        />
                    </Col>
                    <Col>
                        <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="1">

                                <Accordion.Header className="bg-warning" > <b style={{ marginRight: '1em' }}>descricao</b> <AiFillYoutube /></Accordion.Header>
                                <Accordion.Body>
                                    <p> {eventosDados.descricao} </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>

                <Button variant="contained" sx={{
                    color: "var(--cinza-texto)",
                    background: "var(--amarelo)",
                    border: "3px solid var(--amarelo)",
                    width: 120,
                    '&:hover': {
                        color: "white",
                        background: "var(--azul-escuro)",
                        border: "3px solid var(--azul-escuro)",

                    },
                }} onClick={() => router.back()}>Voltar</Button>
            </Container>
        </>
    )
}

export default detalheseventos

export async function getServerSideProps(context) {
    const eventoId = context.params.id
    const resultadoEventos = await apiDeputados.get(`/eventos/${eventoId}`)
    const eventosDados = resultadoEventos.data.dados

    return {
        props: { eventosDados, eventoId },
    }
}