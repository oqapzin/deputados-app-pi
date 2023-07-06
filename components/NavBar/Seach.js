import React from 'react'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Seach = ({ placeHolder, type }) => {
  const { push } = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm();

  function Pesquisar(dados) {
    push(`/${type}/busca/${dados.Nome}`)
  }


  return (
    <form className="d-flex" noValidate onSubmit={handleSubmit(Pesquisar)} >
      <Search >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase

          placeholder={placeHolder}
          inputProps={{ 'aria-label': 'search', 'border-color': 'red' }}
          label="Error"

          {...register('Nome',
            {
              required: "Você precisa digitar um nome.",
              pattern: { value: /^[A-Za-z]+$/i, message: "Insira somente letras." },
              maxLength: { value: 20, message: "teste2" }
            }
          )}
        />
      </Search>
    </form>
  )
}

export default Seach