import NavBar from '../components/Navbar'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ErrorPage() {

    const [backgroundImage, setBackgroundImage] = useState("")
    const router = useRouter();

    useEffect(() => {
        setBackgroundImage("/images/background.png")
    }, [])
    return (
        <>
            <style type="text/css">
                {`
                    body {
                        background: url(${backgroundImage});
                        background-size: 15% 30%;
                    }
                
                `}
            </style>

            <NavBar
                navBarItem="main"
                title="Seu deputado - 404"
            >

                <div className='font-weight-bold text-center mt-5 py-5' style={{ fontSize: 60 }}>
                    404 ERROR
                    <h4 className='text-center text-uppercase text-muted font-weight-bold pt-2' style={{ fontSize: 20 }}>Página inexistente</h4>

                    <br />
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
                </div>
            </NavBar>
        </>
    )
}