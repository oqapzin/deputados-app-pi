import apiDeputados from '../../services/conectaAPI'
import NavBar from '../../components/Navbar'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'
import { AiFillYoutube } from 'react-icons/ai'


export default function Home({ eventos, limitedData }) {
  function getData() {
    var obj
    const objsContat = []
    eventos.map(item => {
      obj = {
        id: item.id,
        title: item.descricaoTipo,
        start: item.dataHoraInicio,
        end: item.dataHoraFim,
        url: '/agenda/' + item.id
      };

      objsContat.push(obj)
    })

    return objsContat;
  }

  return (
    <>
    <style type="text/css">{`
        .afc-completed .fc-event-title  {
            color: yellow; 
            background-color: #A6B5BC;   /*  grey */
            text-decoration: line-through;
        }

        .afc-important .fc-event-title  {
            color: #C00 !important;
            font-weight: bold !important;
        }
                
    `}
    </style>

      <NavBar
        navBarItem="main"
      >
      </NavBar>
      <Container>
        <Row style={{ padding: '5em' }}>
          <Col>
            <h2>Agenda de votações </h2>
          </Col>
          <FullCalendar
          
            slotLaneClassNames={'bg-warning'}
            eventClassNames={'bg-warning'}
            moreLinkClassNames={'bg-warning'}
            dayHeaderClassNames={'bg-warning'}
            viewClassNames={'bg-light '}
            plugins={[dayGridPlugin,interactionPlugin]}
            initialView="dayGridMonth"
            events={getData()}
            editable={"true"}
            eventTextColor={'rgb(255,0,0)'}
            height="auto"
            locales={"pt-Br"}
            moreLinkContent={"Mais eventos+"}
            dayHeaderFormat={
              { weekday: 'long' }
            }
            views={{
              dayGrid: {
                dayMaxEventRows: 4 
              }
            }}
            headerToolbar={
              {
                start: '',
                center: 'title',
                end: 'today prev,next',
              }
            }
            eventClick={function (info) {
              alert('Você está sendo direcionado para: ' + info.event.title);
            }}
            timeZone='local'

          />
        </Row>

        <Row xl={12}>
          <Col style={{ textAlign: 'center', padding: '2em' }} md={12} >
            <h2>
              <b>Últimos eventos</b>
            </h2>
          </Col>
        </Row>

        <Row >
          {limitedData.map(item =>
            <Col style={{ padding: '20px' }} md={6}>
              <Card md={12} key={item.id} >
                  <iframe style={{boxShadow:'0 6px 6px rgba(10,10,10,.1), 0 0 0 4px rgba(10,10,10,.1)'}} id="ytplayer" type="text/html" width="100%" height="360px"
                    src={item.urlRegistro ? "https://www.youtube.com/embed/" + item.urlRegistro.substring(item.urlRegistro.lastIndexOf("=") + 1) : "https://www.youtube.com/embed/fj6vwqa-gmc"}
                    frameborder="1"
                  />
                <Card.Header className=" bg-warning">
                  <h2> {item.descricaoTipo} </h2>
                </Card.Header>
                <Card.Body style={{textAlign: 'center' }}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">

                    <Accordion.Header> <b style={{ marginRight: '1em' }}>descricao</b> <AiFillYoutube /></Accordion.Header>
                    <Accordion.Body>
                      <p> {item.descricao} </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const res = await apiDeputados.get('/eventos?itens=30')

  const eventos = res.data.dados

  const limit = 5

  const limitedData = eventos.slice(0, limit)

  return {
    props: { eventos, limitedData }
  }
}