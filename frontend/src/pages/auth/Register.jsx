
import { useState, useContext } from "react"

import Validation from "./Validation";
import { Modal, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";


function Register({handleToggle, show, setShow, setSuccess}) {
    const {isRegisterSuccess, error, handleRegister} = useAuth()

    const [passwordShown, setPasswordShown] = useState(false);
    const [account, setAccount] = useState({
        email: "",
        username: "",
        password: "",
        confirmpassword: "",
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (event) => {
        const value = {...account, [event.target.name]: event.target.value}
        setAccount(value)    
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrors(Validation(account))   
        console.log(account)
        handleRegister(account.email, account.username, account.password)
        if(error){
            console.log(error)
        }
        else {
            setShow(false)          
            setSuccess(true) 
        }
    }

    
  return (
    <Modal 
        show={show} 
        onHide={handleToggle} 
        centered        
    >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="ms-auto fs-2" style={{color: '#1687A7'}}>Create Account</Modal.Title>
        </Modal.Header>

        <Modal.Body className=" mx-3 mb-3 ">
          <Form onSubmit={handleSignUp} className="w-75 mx-auto">
            {!isRegisterSuccess && <div style={{color: "red", fontSize: '14px', margin: '0px 0px 10px 10px'}}>{error}</div>}
            
                <Form.Group>
                    <Form.Label className="fw-bolder" style={{fontSize: "14px"}}>Fullname:</Form.Label>
                    <Form.Control type="text" value={account.username} name='username' onChange={handleInputChange} className='rounded-pill border-1 border-black p-0' size="sm"  required/>
                    {errors && <div style={{color: "red", fontSize: '14px', margin: '0px 0px 10px 10px'}}>{errors.username}</div>}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bolder" style={{fontSize: "14px"}}>Email:</Form.Label>
                    <Form.Control type="text" name="email" onChange={handleInputChange}  rows={1}  className='rounded-pill border-1 border-black' size="sm" required/>
                    {errors && <div style={{color: "red", fontSize: '14px', margin: '0px 0px 10px 10px'}}>{errors.email}</div>}
                </Form.Group>
                
                <Form.Group>
                    <Form.Label className="fw-bolder" style={{fontSize: "14px"}}>Password:</Form.Label>
                    <Form.Control 
                        type={passwordShown ? "text" : "password"}                         
                        name = "password"
                        onChange={handleInputChange}  
                        rows={1} 
                         
                        className='rounded-pill border-1 border-black' 
                        size="sm" required/>
                    {errors && <div style={{color: "red", fontSize: '14px', margin: '0px 0px 10px 10px'}}>{errors.password}</div>}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="fw-bolder" style={{fontSize: "14px"}}>Confirm Password:</Form.Label>
                    <Form.Control type="text" name="confirmpassword" onChange={handleInputChange}  rows={1}  className='rounded-pill border-1 border-black' size="sm" required/>
                    {errors && <div style={{color: "red", fontSize: '14px', margin: '0px 0px 10px 10px'}}>{errors.corfirmpassword}</div>}
                </Form.Group>
                    

                <Button onClick={handleSignUp}  className='rounded-pill border-1 border-black w-100 mt-3 border-0 bg-primary-dark'>Sign up</Button>
             

                    <div className="mx-auto my-2 d-flex justify-content-center">
                        Already have an account?     
                        <Link onClick={handleToggle} className='ms-1'> Sign in</Link>
                    </div>
                   
               
          </Form>  
        </Modal.Body>
           
      </Modal>
  )
}

export default Register
