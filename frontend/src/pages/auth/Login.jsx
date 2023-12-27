import { Button, Form, Image, Container, Stack, InputGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"


import { useState } from "react"
import useAuth from "../../hooks/useAuth";

import { useLocation, useNavigate, Link } from "react-router-dom";
import Register from "./Register";

import RegisterSuccess from "../../components/Modals/RegisterSuccess";

import Logo from './../../assets/images/logo_large.png'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Social from "../../components/Social";
import { useAppContext } from "../../context/authContext";
import { registerRequest } from "../../actions/actions";

function Login() {
    const {dispatch} = useAppContext()
    const {error, user, handleLogin,} = useAuth()
    
    const {saveToLocalStorage} = useLocalStorage()
    const navigate = useNavigate()

    const [account, setAccount] = useState({
        email: "",
        password: ""
    })

    //path
    const location = useLocation()
    const redirectPath = location.state?.path || '/'
    
    //register open   
    const [isRegister, setisRegister] = useState(false);
    const toggleOpen = () => setisRegister(!isRegister);
    const handleRegister = () => {
        dispatch(registerRequest())
        toggleOpen()
    }

    //login success error?
    const [isSuccess, setSuccess] = useState(false);
    const toggleSuccess = () => setSuccess(!isSuccess);


    const [passwordShown, setPasswordShown] = useState(false);

    //inputform
    const handleInputChange = (event) => {
        const value = { ...account, [event.target.name]: event.target.value }
        setAccount(value)
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage(message);
          }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin(account.email, account.password)
    };
    return (
        <Container 
        className="h-100 mh-100 w-100 mw-100 m-0 p-0 overflow-hidden" 
        style={{ backgroundColor: "#1687A7" }}>
            <Stack className="text-center d-flex justify-content-center align-items-center" style={{ color: "white" }}>
               
                    <Image src={Logo} width={160} height={160} className="mt-4"/>
                    <h1 className="mt-3 fw-bold">CHAT APP</h1>
                    <h4 className="mt-3">LET'S HAVE A CHAT WITH YOUR FRIENDS</h4>
              
            </Stack>

            <Stack className="bg-primary-gray mt-2 mb-2  h-100 rounded-circle d-flex align-items-center"
            style={{width:"110%", marginLeft: '-5%'}}>
                
           
                <Form onSubmit={handleSubmit} className="w-25 text-center">

                        <h2 className="fw-bolder mt-3 color-primary-main">Sign in</h2>
                        {error && <span className="text-danger">{error}</span>}
                        <InputGroup className="my-3">
                            <Form.Control
                                type="text"
                                placeholder="Email or Phone Number..."
                                name="email"
                                onChange={handleInputChange}
                                onKeyDown={handleEnter}
                                required
                                className='rounded-pill border-1 border-secondary fs-6 py-2 ps-3 pe-5 w-100'
                            />

                        </InputGroup>
                        
                        <InputGroup id="floatinglabel" label="Password"  >
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                placeholder="Password..."
                                name="password"
                                onChange={handleInputChange}
                                onKeyDown={handleEnter}
                                required
                                className='rounded-pill border-1 border-secondary fs-6 py-2 ps-3 pe-5 w-100'
                            />
                            
                        </InputGroup>

                        <Form.Group className="mb-1">
                            <Link style={{ color: "#1687A7", fontWeight: "700" }}>Forgot Password?</Link>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Button onClick={handleSubmit} variant="primary" type="submit" style={{ backgroundColor: "#276678", width: "100px" }} className='rounded-pill fw-bold'>
                                Sign in
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1" className="fw-bold fs-7 ">
                            <Form.Label className="fw-bold">Not registered?
                                <Link onClick={handleRegister} style={{ color: "#1687A7", fontWeight: "700" }}> Sign up</Link>
                            </Form.Label>
                        </Form.Group>
                        <div className='d-flex flex-row align-items-center'>
                            <div style={{flex: 1, height: '0.5px', backgroundColor: 'gray'}} className="mb-3"/>

                            <div><p className=' mx-2 fw-bold'>Or sign in with</p></div>
                            <div style={{flex: 1, height: '1px', backgroundColor: 'gray'}} className="mb-3"/>
                        </div>
                        <Social/>
                        <Register handleToggle={toggleOpen} show={isRegister} setShow={setisRegister} isSuccess={isSuccess} setSuccess={setSuccess} />
                        <RegisterSuccess handleToggle={toggleSuccess} show={isSuccess} />
                 
                </Form>
            </Stack>
        </Container>
    )
}

export default Login