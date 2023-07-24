import React from 'react'
import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      UserName: username,
      Password: password
    }

    fetch('https://list-o-movies-311c22237892.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Login response: ', data)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
          onLoggedIn(data.user, data.token)
        } else alert('No such user')
      })
      .catch(e => alert('Something went wrong'))
  }
  
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='row gy-2 gx-3 align-items-center'>
          <Row className='mb-3'>
            <label
              htmlFor='usernameControl1'
              className='col-form-label col-sm-3'>
                Username:
              </label>
            <Col className='col-sm-9'>
              <input
                type="text"
                className='form-control'
                id='usernameControl1'
                placeholder='Username...'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row className='mb-3'>
            <label
              htmlFor='passwordControl1'
              className='col-form-label col-sm-3'>
                Password:
              </label>
            <Col className='col-sm-9'>
              <input
                type="password"
                className='form-control'
                id='passwordControl1'
                placeholder='Password...'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <button
              type="submit"
              className='btn btn-primary col-sm-10'>
                Submit
            </button>
          </Row>
      </form>
    </>
  )
}