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
import { dateFormatter } from '../../../functions/formatter';

const detalhesPartido = ({ partido, liderPartidoDados, membrosPartidoMasc, membrosPartidoFem }) => {
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
              <h3 style={{ fontSize: 30, fontWeight: 500, fontFamily: "spen Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;" }}>LIDER DO PARTIDO</h3>
              <h1 style={{ fontSize: 60, fontWeight: 500, fontFamily: "spen Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;" }}> {liderPartidoDados["ultimoStatus"].nome}</h1>
            </div>
            <Grid container>
              <Grid md={2} sx={{ margin: "0 0 2% 3%" }}>
                <CardMedia
                  component="img"
                  image={liderPartidoDados["ultimoStatus"].urlFoto}
                  title={liderPartidoDados["ultimoStatus"].nome}
                  style={{ borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", marginBottom: "30px" }}
                />

                <Tag
                  Islabel="Deputados:"
                  value={membrosPartidoMasc.length}
                  warning
                  center
                />

                <Tag
                  Islabel="Deputadas:"
                  value={membrosPartidoFem.length}
                  warning
                  center
                />
              </Grid>
              <Grid md={8} sx={{ ml: 4, color: "#858585", fontSize: "1.2rem", fontFamily: 'Montserrat', fontStyle: "normal", fontWeight: 500 }}>
                <div style={{ display: "flex" }}>
                  <Grid sx={{ ml: 4, mr: 16, display: "flex", flexDirection: "column" }}>
                    <Tag
                      Islabel="Nome Civil:"
                      value={liderPartidoDados.nomeCivil}

                      blue
                    />

                    <Tag
                      Islabel="Partido:"
                      value={`${liderPartidoDados.municipioNascimento} - ${liderPartidoDados.ufNascimento}`}
                      blue
                    />

                    <Tag
                      Islabel="Naturalidade:"
                      value={`${liderPartidoDados.municipioNascimento} - ${liderPartidoDados.ufNascimento}`}
                      blue
                    />

                    <Tag
                      Islabel="Data de Nascimento:"
                      value={dateFormatter(liderPartidoDados.dataNascimento)}
                      blue
                    />

                    <Tag
                      Islabel="Nível de escolaridade:"
                      value={liderPartidoDados.escolaridade}
                      blue
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <Tag
                      Islabel="Gabinete:"
                      value={`Gabinete ${liderPartidoDados["ultimoStatus"]["gabinete"].nome} - Prédio ${liderPartidoDados["ultimoStatus"]["gabinete"].predio} - Sala ${liderPartidoDados["ultimoStatus"]["gabinete"].sala}`}
                      blue
                    />

                    <Tag
                      Islabel="Telefone:"
                      value={liderPartidoDados["ultimoStatus"]["gabinete"].telefone}
                      blue
                    />

                    <Tag
                      Islabel="E-mail:"
                      value={liderPartidoDados["ultimoStatus"]["gabinete"].email}
                      blue
                    />

                  </Grid>
                </div>
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
            resetPageToTop={false}
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
  const resultLiderDados = await apiDeputados.get(`/deputados/${liderPartido[0].id}`)
  const liderPartidoDados = resultLiderDados.data.dados

  const resultMembrosMasc = await apiDeputados.get(`/deputados?siglaSexo=M&siglaPartido=${partido["sigla"]}&ordenarPor=nome&ordem=asc`)
  const membrosPartidoMasc = resultMembrosMasc.data.dados
  const resultMembrosFem = await apiDeputados.get(`/deputados?siglaSexo=F&siglaPartido=${partido["sigla"]}&ordenarPor=nome&ordem=asc`)
  const membrosPartidoFem = resultMembrosFem.data.dados

  return {
    props: { partido, liderPartidoDados, membrosPartidoMasc, membrosPartidoFem },
  }
}
