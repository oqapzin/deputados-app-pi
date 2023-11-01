import React, { useEffect, useState } from "react"
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import apiDeputados from "../../services/conectaAPI";

/**/
const listOptions = [
    { title: "Masculino", type: "sex", label: "M", disabled: false },
    { title: "Feminino", type: "sex", label: "F", disabled: false },
    { title: "Estado", type: "estado", label: "estado", disabled: false },
    { title: "Partido", type: "partido", label: "partido", disabled: false },

];


const StateOptions = [
    { title: "Acre", type: "uf", label: "ac", disabled: false },
    { title: "Alagoas", type: "uf", label: "al", disabled: false },
    { title: "Amapá", type: "uf", label: "ap", disabled: false },
    { title: "Amazonas", type: "uf", label: "am", disabled: false },
    { title: "Bahia", type: "uf", label: "ba", disabled: false },
    { title: "Ceará", type: "uf", label: "ce", disabled: false },
    { title: "Distrito Federal", type: "uf", label: "df", disabled: false },
    { title: "Espírito Santo", type: "uf", label: "es", disabled: false },
    { title: "Goiás", type: "uf", label: "go", disabled: false },
    { title: "Maranhão", type: "uf", label: "ma", disabled: false },
    { title: "Mato Grosso", type: "uf", label: "mt", disabled: false },
    { title: "Mato Grosso do Sul", type: "uf", label: "ms", disabled: false },
    { title: "Minas Gerais", type: "uf", label: "mg", disabled: false },
    { title: "Pará", type: "uf", label: "pa", disabled: false },
    { title: "Paraíba", type: "uf", label: "pb", disabled: false },
    { title: "Paraná", type: "uf", label: "pr", disabled: false },
    { title: "Pernambuco", type: "uf", label: "pe", disabled: false },
    { title: "Rio de Janeiro", type: "uf", label: "rj", disabled: false },
    { title: "Rio Grande do Norte", type: "uf", label: "rn", disabled: false },
    { title: "Rio Grande do Sul", type: "uf", label: "rs", disabled: false },
    { title: "Rondônia", type: "uf", label: "ro", disabled: false },
    { title: "Roraima", type: "uf", label: "rr", disabled: false },
    { title: "Santa Catarina", type: "uf", label: "sc", disabled: false },
    { title: "São Paulo", type: "uf", label: "sp", disabled: false },
    { title: "Sergipe", type: "uf", label: "se", disabled: false },
    { title: "Tocantins", type: "uf", label: "to", disabled: false },
]


const FilterBy = ({ onAddUser }) => {
    /*estado para armazenar todos os filtros selecionados*/
    const [filterValue, setFilterValue] = useState([]);
    /*estado para armazenar o retorno da api*/
    const [dataSeached, setDataSeached] = useState([]);
    const [filterUfAction, setFilterUfAction] = useState(false);
    const [filterPartidoAction, setFilterPartidoAction] = useState(false);
    /*variavel com texto formatado*/
    let formattedSeach = ""


    useEffect(() => {
        onAddUser(dataSeached)
    }, [dataSeached])

    useEffect(() => {
        filter()
    }, [filterValue])



    function filter() {

        console.log(listOptions)
        if (listOptions[0]["disabled"] && (listOptions[0]["label"] == "M" && filterValue.filter(item => item.title == "Masculino"))) {
            listOptions[0]["disabled"] = false
        }


        if (listOptions[1]["disabled"] && (listOptions[1]["label"] == "F" && filterValue.filter(item => item.title == "Feminino"))) {
            listOptions[1]["disabled"] = false
        }

        if (!filterUfAction && filterValue.filter(item2 => item2.type == "estado")) {
            setFilterUfAction(true)
        } else if (filterUfAction) {
            setFilterUfAction(false)
        }

        if (!filterPartidoAction && filterValue.filter(item2 => item2.type == "partido")) {
            setFilterPartidoAction(true)
        } else if (filterPartidoAction) {
            setFilterPartidoAction(false)
        }


        /*checar se o objeto se o objeto esta vazio*/
        if (filterValue.length > 0) {
            filterValue.map(item => {
                switch (item.type) {
                    case 'uf':
                        formattedSeach = formattedSeach + "&siglaUf=" + item.label
                        break;
                    case 'partido':

                        formattedSeach = formattedSeach + "&siglaUf=" + item.label
                    case 'sex':
                        formattedSeach = formattedSeach + "&siglaSexo=" + item.label,
                            item.disabled = true,
                            (item.label === "M") ? listOptions[1]["disabled"] = true : listOptions[0]["disabled"] = true
                        break;
                    default:
                        break;
                }


                /*primeiro filtro criado para desabilitar o sexo F, caso se o M ja estivesse habilitado */
                /*(item.label == "M" && formattedSeach.includes("F") || item.label == "F" && formattedSeach.includes("M"))
                ? false : formattedSeach = formattedSeach + "&siglaSexo=" + item.label,  item.disabled = true  */
            })

            /*remove o primeiro caractere do texto*/
            formattedSeach = formattedSeach.substring(1)

            /*chama a funcao assincrona para realizar a busca na api*/
            getData(formattedSeach)
        }

        if (filterValue.length == 0) {
            onAddUser(null)
        }
    }

    async function getData(formattedText) {
        const resultConsult = await apiDeputados.get(`/deputados/?${formattedText}&ordem=ASC&ordenarPor=nome`)
        const resultDeputados = resultConsult.data.dados
        setDataSeached(resultDeputados)
    }



    return (
        <div style={{ display: "flex" }}>
            <Stack spacing={3} sx={{ width: 300, marginRight: 5 }}>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={listOptions}
                    getOptionLabel={(option) => option.title}
                    getOptionDisabled={(option) => !!option.disabled}
                    filterSelectedOptions
                    onChange={(event, filterValue) => {
                        setFilterValue(filterValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Filtrar por"
                        />
                    )}
                />
            </Stack>
            {
                filterUfAction ?
                    <Stack spacing={3} sx={{ width: 300, marginRight: 5 }}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={StateOptions}
                            getOptionLabel={(option) => option.title}
                            getOptionDisabled={(option) => !!option.disabled}
                            filterSelectedOptions
                            onChange={(event, filterValue) => {
                                setFilterValue(filterValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Filtrar por UF"
                                />
                            )}
                        />
                    </Stack>
                    : <></>
            }
            {
                filterPartidoAction ?
                    <Stack spacing={3} sx={{ width: 300, marginRight: 5 }}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={StateOptions}
                            getOptionLabel={(option) => option.title}
                            getOptionDisabled={(option) => !!option.disabled}
                            filterSelectedOptions
                            onChange={(event, filterValue) => {
                                setFilterValue(filterValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Filtrar por estado"
                                />
                            )}
                        />
                    </Stack>
                    : <></>
            }

        </div>
    )
}

export default FilterBy