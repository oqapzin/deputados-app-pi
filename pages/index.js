import React from 'react'
import { Card, CardGroup, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../components/Navbar';



export default function Home() {

    return (
        <>
            <NavBar>
                <p className='px-4 ralewayFont' style={{ fontSize: "clamp(0.4em, 0.8em + 1vw, 1.6em)" }} >
                    Esse é um trabalho realizado por estudantes do <b style={{ color: "red", textShadow: '1px 1px 2px #000000' }}>IESB </b><b>(Arthur, Kaio, Maicon e Pedro)</b>,
                    com o intuito de criar um site em front-end, utlizando a API da câmara dos deputados.
                </p>
                <p className='px-4 ralewayFont' style={{ fontSize: "clamp(0.4em, 0.8em + 1vw, 1.6em)" }}>
                    Para a realização do projeto utilizaremos o framework <b style={{ color: "var(--amarelo)", textShadow: '1px 1px 2px #000000' }}>Next.js</b> provindo do <b style={{ color: "var(--amarelo)", textShadow: '1px 1px 2px #000000' }}>React</b>,
                    adicionamos também o uso de algumas bibliotecas, como: <b style={{ color: "var(--amarelo)", textShadow: '1px 1px 2px #000000' }}>react-bootstrap, full-calendar, chart.js,
                        axios, mui, entre outras.</b>
                </p>
                <p className='px-4 ralewayFont' style={{ fontSize: "clamp(0.4em, 0.8em + 1vw, 1.6em)" }}>
                    O projeto tem por finalidade implementar novos componentes não utilizados em sala, no qual incluimos:
                    <b style={{ color: "var(--amarelo)", textShadow: '1px 1px 2px #000000' }}> Sistema de busca, barra de reloading, filtros, favoritar deputados, paginação, gráficos, calendário,
                        carousel, google map iframe e exibição de videos.</b>
                </p>
                <Row xs={1}>
                    <Carousel>
                        <Carousel.Item interval={2500}>
                            <CardGroup className='py-2 my-3'>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://media.istockphoto.com/id/1361392613/pt/foto/nacional-congress-palace.jpg?s=612x612&w=0&k=20&c=Qkr9M8_r_b1YhcpSUWXKNkbT4rHzJ0tmxcOx7DOXDiA=" alt="Card image" />
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://images.jota.info/wp-content/uploads/2022/10/deputados-eleitos-bancada.jpg" alt="Card image" />
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://uploads.metropoles.com/wp-content/uploads/2022/12/21163101/Arthur-Lira-presidente-da-Ca%CC%82mara-no-Plena%CC%81rio-da-Ca%CC%82mara-dos-Deputados-onde-sera%CC%81-votada-em-segunda-insta%CC%82ncia-a-PEC-10.jpg" />
                                    </Card>
                                </Col>
                            </CardGroup>
                        </Carousel.Item>
                        <Carousel.Item interval={2500}>
                            <CardGroup className='py-2 my-3'>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://midias.correiobraziliense.com.br/_midias/jpg/2022/07/22/675x450/1_projetopoliteia__2_-26097421.jpg?20220722183205?20220722183205" alt="Card image" />
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://mediaserver.almg.gov.br/acervo/585/564/1585564.jpg" alt="Card image" />
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="my-5">
                                        <Card.Img src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/08/senado-federal.jpg" alt="Card image" />
                                    </Card>
                                </Col>
                            </CardGroup>
                        </Carousel.Item>
                    </Carousel>
                </Row>


                <Row>
                    <Col>
                        <iframe src="https://www.google.com/maps/embed?pb=!4v1687459002819!6m8!1m7!1sGy_A6yLgWRJqbFMB3jHS7w!2m2!1d-15.79919876882989!2d-47.86512973453013!3f113.14190172335316!4f-1.807287510786253!5f0.4000000000000002" className="w-100" height="450" style={{ border: "0", boxShadow: "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </Col>
                    <Col>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d185701.46921843925!2d-48.0772215685764!3d-15.815020044078937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x935bcc64ba8942e9%3A0x79640388ffba5890!2sCeil%C3%A2ndia%20Norte%20QNN%2031%20IESB%20-%20Distrito%20Federal%2C%20Bras%C3%ADlia%20-%20DF!3m2!1d-15.8100212!2d-48.125286499999994!4m5!1s0x935a3b39ba8ad207%3A0x6880d024f2b0d40d!2sC%C3%A2mara%20dos%20Deputados%2C%20Pal%C3%A1cio%20do%20Congresso%20Nacional%2C%20C%C3%A2mara%20dos%20Deputados%2C%20Pra%C3%A7a%20dos%20Tr%C3%AAs%20Poderes%2C%20Bras%C3%ADlia%20-%20DF%2C%2070160-900!3m2!1d-15.8000641!2d-47.864356199999996!5e1!3m2!1spt-BR!2sbr!4v1687459490001!5m2!1spt-BR!2sbr" className="w-100" height="450" style={{ border: "0", boxShadow: "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </Col>

                </Row>
            </NavBar>
        </>
    );
}