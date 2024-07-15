import React, { useState } from 'react'
import './LoginSignUp.css'
import Email1 from '../Assets/Email1'
import Person1 from '../Assets/Person1'
import Password1 from '../Assets/Password1'
import Phone1 from '../Assets/Phone1'

const LoginSignUp = () => {

    const [action, setAction] = useState("Sign Up")

    const [data,setData] = useState({
        name : '',
        phoneNumber : '', 
        email : '',
        password : ''
    })

    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }

    const submitHandler =  async (e, actionType) => {
        e.preventDefault()
        setAction(actionType)
        console.log(actionType)
        if( actionType === 'Sign Up' && action === "Sign Up"){
        try{
            const response =  await fetch('http://localhost:8080/api/register',{
                method : 'POST', 
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            
            if(response.ok){
                console.log('Registered Successfully', data)
                alert('Registered Successfully')
            }else{
                console.log(response)
                console.error('Registration Failed')
            }
        }catch(error){
            console.error('Error', error)
            alert('An Error occured while registration ')
        }
    }else if( actionType === 'Login' && action === "Login" ){
        alert('Logins are yet to be commenced')
    }
    }

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action === "Login"?  <div></div> :
                <div className="input">
                    <div className="per"><Person1/></div>
                    <input  type='text' name = 'name' value={data.name} placeholder='Name' onChange={changeHandler} required/>
                </div>
            }
            {action === "Login"?  <div></div> :
            <div className="input">
                <div className="per"><Phone1/></div>
                <input  type='number' name = 'phoneNumber' value={data.phoneNumber}  placeholder='Mobile Number' onChange={changeHandler} required/>
            </div>
            }
            <div className="input">
            <div className="per"><Email1/></div>
                <input type='email' name = 'email' value={data.email}  placeholder='Email Id'  onChange={changeHandler} required/>
            </div>
            <div className="input">
            <div className="per"><Password1/></div>
                <input type='password' name = 'password' value={data.password}  placeholder='Password' onChange={changeHandler} required/>
            </div>
        </div>
        {action === "Login"?  <div></div> :
        <div className="forgot-password">Forgot Password? <span>Click Here!</span></div>}
       <div className="submit-container">
        <div className={action === "Login"? "submit gray":"submit"} onClick={ (e) => submitHandler(e,"Sign Up") }>Sign Up</div>
        <div className={action === "Sign Up"? "submit gray":"submit"} onClick={  (e) => submitHandler(e,"Login")}>Login </div>
       </div>
    </div>
    
  )
}

export default LoginSignUp
