import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setId, setToken } from '../helpers/auth'

const Login = () => {

  const navigate = useNavigate() 
  const [ errors, setErrors ] = useState(false)
  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value  })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
    const { data } = await axios.post(`${API_URL}/login`, loginData)
    setToken(data.token)
    setId(data.userId)
    navigate(`/users/${data.userId}`)

    } catch (error) {
      setErrors(error.response.data.messages)
      console.log(error.response.data.messages)
    }
  }
  

  return  ( 
    <div className='form-main'>

      <h1>Login Page</h1>
      {errors && <div className='error'>{errors}</div>}

      <form onSubmit={onSubmit} className='form-wrapper'>
          <input type='text' name='userName' placeholder='Username' onChange={handleChange} value={loginData.userName} />
          <input type='password' name='password' placeholder='Password' onChange={handleChange} value={loginData.password} />
          <button type='submit'>Login</button>
      </form>

  </div>
  )
}

export default Login