import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';

const CardPartidos = ({ arrayName = [], textCenter = "", isFavoritePage = false, favPageIsNull }) => {
    const [favPartidos, setFavPartidos] = useState([])
    const [partidos, setPartidos] = useState([])


    useEffect(() => {
        setFavPartidos(getFavPartidos())
        setPartidos(arrayName)
    }, [])

    useEffect(() => {
        setPartidos(arrayName)
    }, [arrayName])


    favPartidos.map(item => {
        if (partidos.length > 0) {
            let indexList = partidos.filter(item2 => item2.sigla == item)
            partidos.splice(0, 0, partidos.splice(partidos.indexOf(indexList[0]), 1)[0])
        }
    })


    function getFavPartidos() {
        return JSON.parse(window.localStorage.getItem("FavoritosPartidos")) ?? []
    }

    function remFavorite(idFavorite) {
        const favPartidos = getFavPartidos()
        const favPartidosId = favPartidos.indexOf(idFavorite)

        if (favPartidosId >= 0) {
            favPartidos.splice(0, 1)
            window.localStorage.setItem("FavoritosPartidos", JSON.stringify(favPartidos))
            setFavPartidos(favPartidos)

            if (isFavoritePage) {
                let indexList = partidos.filter(item2 => item2.sigla == idFavorite)

                partidos.splice(partidos.indexOf(indexList[0]), 1)

                /*se a array partidos e favPartidos forem vazias, enviar para o favoritos/index.js o valor false*/
                if (partidos.length == 0 && favPartidos.length == 0) {
                    favPageIsNull(true)
                }
            }
        }
    }

    function addFavorite(idFavorite) {
        const favPartidos = getFavPartidos()
        favPartidos.push(idFavorite)
        window.localStorage.setItem("FavoritosPartidos", JSON.stringify(favPartidos))
        setFavPartidos(favPartidos)
    }

    return (
        <>
            {textCenter &&
                <h1 className='text-center text-uppercase font-weight-bold mt-5 pt-5'>{textCenter}</h1>
            }

            <Grid container>
                {arrayName.map(item => (
                    <Grid md={3}>
                        <Card sx={{ width: 275, margin: 1, borderLeft: "3px solid var(--amarelo)", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {item.sigla}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {item.nome}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small"><Link className="text-decoration-none" href={`/partidos/detalhes/${item.id}`}>Mais detalhes</Link></Button>
                                {favPartidos.indexOf(item.sigla) == -1 ?
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Favoritar seu partido</Tooltip>}
                                    >
                                        <div className="align-items-end ml-auto"><StarBorderIcon onClick={() => addFavorite(item.sigla)} /></div>
                                    </OverlayTrigger>
                                    :
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Desfavoritar seu partido</Tooltip>}
                                    >
                                        <div className="align-items-end ml-auto"><StarIcon value={1} sx={{ color: "var(--amarelo)" }} onClick={() => remFavorite(item.sigla)} /></div>
                                    </OverlayTrigger>
                                }

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default CardPartidos