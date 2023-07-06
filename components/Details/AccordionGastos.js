import React from 'react'
import TableFrentes from './TableFrentes';
import TableGastos from './TableGastos';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop: "4%",
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));


const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',

  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionGastos = ({ arrays = [] }) => {
  return (

    arrays.map(item => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          palette="dark"
        >
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item.array.length > 0 ?
            item.table == "basic" ?
              <TableGastos array={item.array} />
              :
              <TableFrentes array={item.array} />

            :
            <div className='font-weight-bold text-center '>NO MOMENTO NÃO TEMOS DADOS SOBRE O DEPUTADO.</div>
          }
        </AccordionDetails>
      </Accordion>

    ))


  )
}

export default AccordionGastos
