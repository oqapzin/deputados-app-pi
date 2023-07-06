import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Years = ({retYear}) => {
    const [age, setAge] = useState(2023)

    const handleChange = (event) => {
        setAge(event.target.value)
        retYear(event.target.value)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120, "&:hover": {"&& fieldset": {border: "2px solid var(--amarelo)"}}, }} size="small">
            <InputLabel id="demo-select-small-label" sx={{color: "#000000"}}>Ano</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Ano"
                onChange={handleChange}
                defaultValue={30}
                sx={{"&:active": {border: "2px solid var(--amarelo)"}, }}
            >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
            </Select>
        </FormControl>
    )
}

export default Years