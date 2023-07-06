import apiDeputados from '../../../services/conectaAPI'
import CardMedia from '@mui/material/CardMedia';
import NavBar from '../../../components/Navbar';
import Chart from "chart.js/auto";
import AccordionGastos from '../../../components/Details/AccordionGastos';
import Years from '../../../components/Details/Years';
import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Alert from '@mui/material/Alert';
import Tag from "../../../components/Tags"
import { dateFormatter } from '../../../functions/formatter';

const detalhesDeputado = ({ deputadoDados, deputadoId, deputadoFrentesDados }) => {
  const [year, setYear] = useState(2023)
  const [gastos, setGastos] = useState([])
  const [valores, setValores] = useState([])
  const canvasEl = useRef(null);
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const colors = {
    purple: {
      default: "rgba(236, 179, 52, 1)",
      half: "rgba(236, 179, 52, 0.8)",
      quarter: "rgba(236, 179, 52, 0.25)",
      zero: "rgba(236, 179, 52, 0.2)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  useEffect(() => {

    const totais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < gastos.length; i++) {
      const mes = gastos[i].mes;
      totais[mes] += gastos[i].valorLiquido;
    }

    const mostrar = [];
    totais.forEach((valor) => {
      if (valor > 0) {
        mostrar.push(valor.toFixed(2));
      }
    });

    setValores(mostrar);
  }, [gastos]);


  useEffect(() => {

    if (gastos.length > 0) {
      const ctx = canvasEl.current.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 16, 0, 600);
      gradient.addColorStop(0, colors.purple.half);
      gradient.addColorStop(0.65, colors.purple.quarter);
      gradient.addColorStop(1, colors.purple.zero);

      const data = {
        labels: meses,
        datasets: [
          {
            backgroundColor: gradient,
            label: "Valor gasto",
            data: valores,
            fill: true,
            borderWidth: 2,
            borderColor: colors.purple.default,
            lineTension: 0.2,
            pointBackgroundColor: colors.purple.default,
            pointRadius: 3
          }
        ]
      };
      const config = {
        type: "line",
        data: data
      };
      const myLineChart = new Chart(ctx, config);

      return function cleanup() {
        myLineChart.destroy();
      }
    }

  }, [valores])


  function updateYear(teste) {
    setYear(teste)
  }

  useEffect(() => {
    getDataGastos(deputadoId)
  }, [year])

  async function getDataGastos(deputadoId) {
    const resultadoDeputadoGastos = await apiDeputados.get(`/deputados/${deputadoId}/despesas?&itens=110&ordem=DESC&ano=${year}`)
    const deputadoGastos = resultadoDeputadoGastos.data.dados

    setGastos(deputadoGastos)
  }

  return (
    <>
      <NavBar
        navBarItem="main"
        title={deputadoDados["ultimoStatus"].nomeEleitoral}
      >

        <CardContent sx={{ mb: 10, padding: 0, boxShadow: "0 4px 6px rgba(10,10,10,.1), 0 0 0 2px rgba(10,10,10,.1)" }}>
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", background: "linear-gradient( 109.6deg, rgba(255, 255, 255,1) 20.8%, var(--amarelo) 91.1% )", padding: 10 }}>
            <div className='text-center text-uppercase mb-5'>
              <h1 style={{ fontSize: 60, fontWeight: 500, fontFamily: "spen Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;" }}> {deputadoDados["ultimoStatus"].nome}</h1>
            </div>
            <Grid container>
              <Grid md={2} sx={{ margin: "0 0 2% 3%" }}>
                <CardMedia
                  component="img"
                  image={deputadoDados["ultimoStatus"].urlFoto}
                  title={deputadoDados["ultimoStatus"].nomeEleitoral}
                  style={{ borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", marginBottom: "30px" }}
                />

                <Tag
                  Islabel="Condição Eleitoral:"
                  value={deputadoDados["ultimoStatus"].condicaoEleitoral}
                  warning
                  center
                />

                {deputadoDados.ultimoStatus.situacao && (
                  <Tag
                    Islabel="Situação: "
                    value={deputadoDados["ultimoStatus"].situacao}
                    warning
                    center
                  />
                )}
              </Grid>
              <Grid md={8} sx={{ ml: 4, color: "#858585", fontSize: "1.2rem", fontFamily: 'Montserrat', fontStyle: "normal", fontWeight: 500 }}>
                <div style={{ display: "flex" }}>
                  <Grid sx={{ ml: 4, mr: 16, display: "flex", flexDirection: "column" }}>
                     <Tag
                      Islabel="Nome Civil:"
                      value={deputadoDados.nomeCivil}
                      
                      blue
                    />

                    <Tag
                      Islabel="Partido:"
                      value={`${deputadoDados.municipioNascimento} - ${deputadoDados.ufNascimento}`}
                      blue
                    />

                    <Tag
                      Islabel="Naturalidade:"
                      value={`${deputadoDados.municipioNascimento} - ${deputadoDados.ufNascimento}`}
                      blue
                    />

                    <Tag
                      Islabel="Data de Nascimento:"
                      value={dateFormatter(deputadoDados.dataNascimento)}
                      blue
                    />

                    <Tag
                      Islabel="Nível de escolaridade:"
                      value={deputadoDados.escolaridade}
                      blue
                    /> 
                  </Grid>
                  
                  <Grid sx={{ display: "flex", flexDirection: "column" }}>
                    <Tag
                      Islabel="Gabinete:"
                      value={`Gabinete ${deputadoDados["ultimoStatus"]["gabinete"].nome} - Prédio ${deputadoDados["ultimoStatus"]["gabinete"].predio} - Sala ${deputadoDados["ultimoStatus"]["gabinete"].sala}`}
                      blue
                    />

                    <Tag
                      Islabel="Telefone:"
                      value={deputadoDados["ultimoStatus"]["gabinete"].telefone}
                      blue
                    />

                    <Tag
                      Islabel="E-mail:"
                      value={deputadoDados["ultimoStatus"]["gabinete"].email}
                      blue
                    />

                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </CardContent>


        <div className="App">

          <Years retYear={updateYear} />

          {gastos.length > 0 ?
            <canvas id="myChart pt-5" ref={canvasEl} height="100" />
            :
            <Alert severity="warning">O deputado <b>{deputadoDados["ultimoStatus"].nomeEleitoral}</b> não possui dados do ano <b>{year}</b></Alert>
          }
        </div>

        <AccordionGastos arrays={
          [
            {
              title: "gastos",
              array: gastos,
              table: "basic"
            },
            {
              title: "frentes",
              array: deputadoFrentesDados,
              table: "details"
            },

          ]}
        />

      </NavBar>
    </>
  )
}


export default detalhesDeputado
export async function getServerSideProps(context) {
  const deputadoId = context.params.id
  const resultadoDeputado = await apiDeputados.get(`/deputados/${deputadoId}`)
  const deputadoDados = resultadoDeputado.data.dados
  const resultadodFrentesDeputado = await apiDeputados.get(`/deputados/${deputadoId}/frentes`)
  const deputadoFrentesDados = resultadodFrentesDeputado.data.dados

  return {
    props: { deputadoDados, deputadoId, deputadoFrentesDados },
  }
}
