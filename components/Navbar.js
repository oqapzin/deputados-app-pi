import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import Seach from './NavBar/Seach';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


/* NAVBAR - VISUAL OPTIONS*/
const dynamicNavBar = {
    "main": [
        {
            type: "dropdown",
            text: "Deputados",
            values: [
                {
                    text: "Todos os deputados",
                    href: "/deputados"
                },
                {
                    text: "Meus favoritos",
                    href: "/deputados/favoritos"
                }
            ]
        },

        {
            type: "dropdown",
            text: "Partidos",
            values: [
                {
                    text: "Todos os partidos",
                    href: "/partidos"
                },
                {
                    text: "Meus favoritos",
                    href: "/partidos/favoritos"
                }
            ]
        },

        {
            type: "simple",
            active: true,
            text: "Agenda",
            href: "/agenda"
        },

        {
            type: "seach",
            active: true,
            text: "Buscar",
            href: ""
        },
    ],
}

const NavBar = (props) => {
    return (<>
        <Head>
            <link rel="shortcut icon" href="/iconProject1.ico" />
            <title>{props.title ?? "Seu deputado"}</title>
        </Head>

        <Navbar key="lg" className='navBar' expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand className='mr-0'>
                    <Link className="navbar-brand px-2 d-flex" href={props.navBarLink ?? "/"}>
                        <MenuBookIcon sx={{ color: "var(--azul-escuro)", fontSize: 40, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            className="text"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                fontSize: 'clamp(1em, 1em + 1vw, 1.5em)',
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            DEPUTADOS
                        </Typography></Link>
                </Navbar.Brand>



                {dynamicNavBar[props.navBarItem ?? "main"].length > 0 ? <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} /> : <></>}

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    key={Math.floor(Math.random())}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                >
                    <Offcanvas.Body>
                        <Nav key={Math.floor(Math.random())} className="justify-content-end flex-grow-1 pe-3">
                            {dynamicNavBar[props.navBarItem ?? "main"].map((item, index) => {
                                switch (item.type) {
                                    case "simple":
                                        return (<Link key={index + item.text} className="nav-link text px-3" href={item.href}>{item.text}</Link>)
                                    case "dropdown":
                                        return (
                                            <NavDropdown
                                                title={item.text}
                                                id={`textColor`}
                                                className="text px-2"
                                                key={index}
                                            >

                                                {item.values.map(item2 => (
                                                    <Link key={index + item2.text} className="dropdown-item text" href={item2.href}>{item2.text}</Link>
                                                ))}
                                            </NavDropdown>
                                        )
                                    case "seach":
                                        if (item.active) return (<Seach key={index + item.text} placeHolder={item.text} type={props.seachPage || "deputados"} />)
                                }
                            })}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>

        <div className="py-5 mb-5 mt-5" >
            <Container style={{ marginTop: "4%" }}>
                {props.children}
            </Container>
        </div>

    </>)
}

export default NavBar
