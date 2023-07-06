import apiDeputados from '../../../services/conectaAPI'
import NavBar from '../../../components/Navbar';
import CardDeputado from '../../../components/CardDeputado';
import Chart from "chart.js/auto";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Tag from '../../../components/Tags';
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

const detalhesPartido = ({ partido, liderPartido, membrosPartidoMasc, membrosPartidoFem }) => {
  const [deputados, setDeputados] = useState([])
  const [deputadas, setDeputadas] = useState([])
  const [concatDeputaos, setConcatDeputaos] = useState([]) /*concatenar a busca de deputados femininos e masculinos*/
  const canvasEl = useRef(null);
  const router = useRouter();
  const ufs = [
    null,
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  const graphicColors = {
    blue: {
      default: "rgba(236, 179, 52, 1)",
      half: "rgba(236, 179, 52, 0.8)",
      quarter: "rgba(236, 179, 52, 0.25)",
      zero: "rgba(236, 179, 52, 0.2)"
    },
    red: {
      default: "rgba(168,0,0, 1)",
      half: "rgba(168,0,0, 0.8)",
      quarter: "rgba(168,0,0, 0.25)",
      zero: "rgba(168,0,0, 0.2)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };



  useEffect(() => {
    const concat = membrosPartidoMasc.concat(membrosPartidoFem)

    setConcatDeputaos(concat)
  }, [membrosPartidoMasc, membrosPartidoFem]);


  useEffect(() => {
    const totais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < membrosPartidoFem.length; i++) {
      const mes = ufs.indexOf(membrosPartidoFem[i].siglaUf)

      totais[mes] += 1;
    }

    setDeputadas(totais);
  }, [membrosPartidoFem]);

  useEffect(() => {
    const totais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < membrosPartidoMasc.length; i++) {
      const mes = ufs.indexOf(membrosPartidoMasc[i].siglaUf)

      totais[mes] += 1;
    }

    setDeputados(totais);
  }, [membrosPartidoMasc]);



  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, graphicColors.blue.half);
    gradient.addColorStop(0.65, graphicColors.blue.quarter);
    gradient.addColorStop(1, graphicColors.blue.zero);

    const data = {
      labels: ufs,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Masculino",
          data: deputados,
          fill: true,
          borderWidth: 2,
          borderColor: graphicColors.blue.default,
          lineTension: 0.2,
          pointBackgroundColor: graphicColors.blue.default,
          borderColor: "rgb(62,149,205)",
          backgroundColor: "rgb(62,149,205,0.1)",
          pointRadius: 3
        },
        {
          backgroundColor: gradient,
          label: "Feminino",
          data: deputadas,
          fill: true,
          borderWidth: 2,
          borderColor: graphicColors.red.default,
          lineTension: 0.2,
          pointBackgroundColor: graphicColors.red.default,
          borderColor: "rgb(196,88,80)",
          backgroundColor: "rgb(196,88,80,0.1)",
          pointRadius: 3
        }
      ]
    };
    const config = {
      type: "bar",
      data: data
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();

    }

  }, [deputados, deputadas])



  return (
    <>
      <NavBar
        navBarItem="main"
        seachPage="partidos"
        title={partido.nome}
      >

        <CardContent sx={{ mb: 10, padding: 0, boxShadow: "0 4px 6px rgba(10,10,10,.1), 0 0 0 2px rgba(10,10,10,.1)" }}>
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: "linear-gradient( 109.6deg, rgba(255, 255, 255,1) 20.8%, var(--amarelo) 91.1% )", padding: 10 }}>
            <div className='text-center text-uppercase mb-5'>
              <h1 style={{ fontSize: 60, fontWeight: 500, fontFamily: "spen Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;" }}> {liderPartido[0].nome}</h1>
            </div>
            <Grid container>
              <Grid md={2} sx={{ margin: "0 0 2% 3%" }}>
                <CardMedia
                  component="img"
                  image={liderPartido[0].urlFoto}
                  title={liderPartido[0].nome}
                  style={{ borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", marginBottom: "30px" }}
                />

                <Tag
                  Islabel="Deputados:"
                  value={deputados.length}
                  warning
                  center
                />

                <Tag
                  Islabel="Deputadas:"
                  value={deputadas.length}
                  warning
                  center
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>

        <div className="App">
          <canvas id="myChart pt-5" ref={canvasEl} height="100" />
        </div>
        <Card sx={{ marginTop: 6, paddingBottom: 8, borderLeft: "3px solid var(--amarelo)", background: "#F2F2F2" }}>
          <CardDeputado
            arrayName={concatDeputaos}
            textCenter={`Deputados do partido ${partido["sigla"]}`}
            activeFilter={false}
            pageSize={5}
          />
        </Card>

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
      </NavBar>
    </>
  )
}

export default detalhesPartido
export async function getServerSideProps(context) {
  const partidoId = context.params.id

  const resultPartido = await apiDeputados.get(`/partidos/${partidoId}`)
  const partido = resultPartido.data.dados
  const resultLider = await apiDeputados.get(`/partidos/${partidoId}/lideres`)
  const liderPartido = resultLider.data.dados

  const resultMembrosMasc = await apiDeputados.get(`/deputados?siglaSexo=M&siglaPartido=${partido["sigla"]}&ordenarPor=nome&ordem=asc`)
  const membrosPartidoMasc = resultMembrosMasc.data.dados
  const resultMembrosFem = await apiDeputados.get(`/deputados?siglaSexo=F&siglaPartido=${partido["sigla"]}&ordenarPor=nome&ordem=asc`)
  const membrosPartidoFem = resultMembrosFem.data.dados

  return {
    props: { partido, liderPartido, membrosPartidoMasc, membrosPartidoFem },
  }
}
