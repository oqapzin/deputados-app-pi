import Link from 'next/link';
import FilterBy from './CardDeputado/FilterBy';
import PaginationComponent from "./CardDeputado/Pagination"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';

const CardDeputado = ({ arrayName = [], textCenter = "", rowMd = "", activeFilter = true, isFavoritePage = false, favPageIsNull = null, pageSize = 20, resetPageToTop = true }) => {
  const [favDeputados, setFavDeputados] = useState([]);
  const [deputados, setDeputados] = useState([]);
  const [oldDeputados, setOldDeputados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  ;

  useEffect(() => {
    setDeputados(arrayName)
    setOldDeputados(arrayName)
    setFavDeputados(getFavDeputados())
  }, [])

  /*Setar a array no setDeputados toda vez que o arrayName receber um novo valor*/
  useEffect(() => {
    setDeputados(arrayName)
  }, [arrayName])



  favDeputados.map(item => {
    if (deputados.length > 0) {
      let indexList = deputados.filter(item2 => item2.id == item)
      deputados.splice(0, 0, deputados.splice(deputados.indexOf(indexList[0]), 1)[0])
    }
  })


  function getFavDeputados() {
    return JSON.parse(window.localStorage.getItem("Favoritos")) ?? []
  }

  function remFavorite(idFavorite) {
    const favDeputados = getFavDeputados()
    const favDeputadosId = favDeputados.indexOf(idFavorite)

    if (favDeputadosId >= 0) {
      favDeputados.splice(favDeputadosId, 1)
      window.localStorage.setItem("Favoritos", JSON.stringify(favDeputados))
      setFavDeputados(favDeputados)

      if (isFavoritePage) {
        let indexList = deputados.filter(item2 => item2.id == idFavorite)

        deputados.splice(deputados.indexOf(indexList[0]), 1)

        /*se a array deputados e favDeputados forem vazias, enviar para o favoritos/index.js o valor false*/
        if (deputados.length == 0 && favDeputados.length == 0) {
          favPageIsNull(true)
        }
      }
    }
  }

  function addFavorite(idFavorite) {
    const favDeputados = getFavDeputados()
    favDeputados.push(idFavorite)
    window.localStorage.setItem("Favoritos", JSON.stringify(favDeputados))
    setFavDeputados(favDeputados)
  }


  const onPageChange = (event, page) => {
    setCurrentPage(page);
    if(resetPageToTop) window.scrollTo(0, 0);
   
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const paginatedPosts = paginate(deputados, currentPage, pageSize);


  const query = (dados) => {
    dados == null ? (setDeputados(oldDeputados), setCurrentPage(1)) : setDeputados(dados)
  }


  return (
    <>
      {textCenter &&
        <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>{textCenter}</h1>
      }

      {(activeFilter ?? true) &&
        <FilterBy onAddUser={query} />
      }

      <Row key={Math.random() + Math.random()} md={rowMd || 6}>
        {paginatedPosts.map(item => (
          <Col key={Math.random() + Math.random()} className='mt-3 mx-3'>
            <Card sx={{ width: "120%", height: "100%", maxWidth: 400, maxHeight: 500 }}>
              <CardMedia
                sx={{ width: "100%", height: "70%" }}
                component="img"
                src={item.urlFoto}
                title={item.nome}
                onError={(e) => {
                  e.target.src = "https://us-tuna-sounds-images.voicemod.net/765a9934-ed37-4c96-8a9e-b2f58a64e481-1675649959520.jpg";
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${item.siglaPartido ? item.siglaPartido + " -" : ""} ${item.siglaUf}`}
                </Typography>
              </CardContent>
              <CardActions className='justify-content-between'>

                <Button size="small"><Link className="text-decoration-none" href={`/deputados/detalhes/${item.id}`}>Mais detalhes</Link></Button>
                {favDeputados.indexOf(item.id) == -1 ?
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Favoritar seu deputado</Tooltip>}
                  >
                    <div className="align-items-end ml-auto"><StarBorderIcon onClick={() => addFavorite(item.id, item.name)} /></div>
                  </OverlayTrigger>
                  :
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Desfavoritar seu deputado</Tooltip>}
                  >
                    <div className="align-items-end ml-auto"><StarIcon value={1} sx={{ color: "var(--amarelo)" }} onClick={() => remFavorite(item.id)} /></div>
                  </OverlayTrigger>
                }
              </CardActions>
            </Card>

          </Col>
        ))}
      </Row>
      {deputados.length > 1 &&
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={4}
        >
          <PaginationComponent
            items={deputados.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </Box>
      }
    </>
  )
}

export default CardDeputado