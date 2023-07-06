import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { styled } from '@mui/material/styles';
import DialogFrente from './DialogFrente';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "var(--azul-escuro)",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    width: 100,
    maxWidth: 100,
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderStyle: "border-box"

};

const columns = [
    {
        id: 'id',
        label: 'Código Frente.',
        minWidth: 30,
        format: (value) => `#${value}`
    },
    {
        id: 'titulo',
        label: 'Titulo',
        minWidth: 30,
        format: (value) => value
    },
    {
        id: 'id',
        label: 'Detalhes',
        minWidth: 20,
        align: 'left',
        textFalse: "Detalhes indisponível",
        textTrue: "Ver detalhes da frente"
    },
]



const TableFrentes = ({ array = [] }) => {
    const [page, setPage] = useState(0);
    const [show, setShow] = useState(false);
    const [frenteId, setFrenteId] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleShow = (value) => {
        setShow(true)
        setFrenteId(value)
    }

    const closeShow = () => {
        setShow(false)
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow variant="head">
                                {columns.map((column) => (
                                    <StyledTableCell
                                        sx={style}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >

                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {array
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <>

                                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <StyledTableCell key={column.id} align={column.align}>
                                                            {column.label == "Detalhes" ?
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={<Tooltip id="button-tooltip-2">{(value == null) ? column.textFalse : column.textTrue}</Tooltip>}
                                                                >
                                                                    <PersonSearchIcon onClick={() => handleShow(value)} />
                                                                </OverlayTrigger>

                                                                :
                                                                column.format && typeof value === 'number' || column.id == "dataDocumento"
                                                                    ? column.format(value)
                                                                    : value
                                                            }
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </StyledTableRow>
                                        </>
                                    );
                                })}
                        </TableBody>

                        {show &&
                            <DialogFrente dataId={frenteId} closeShow={closeShow} />
                        }

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={array.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={"Linhas por pag."}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </Paper>
        </>
    )
}

export default TableFrentes



