import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

export function UpdateUser({ user, handleSubmit }) {
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    UserName: '',
    Password: '',
    Email: ''
  })

  useEffect(() => {
    console.log(updatedUserInfo)
  }, [updatedUserInfo])
  
  const handleUserUpdate = e => {
    const { name, value } = e.target
    setUpdatedUserInfo(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <h4>Update</h4>
      <Form onSubmit={e => handleSubmit(e, updatedUserInfo)}>
        <Form.Group>
          <Form.Label htmlFor='userNameControl3'>
            Username:
          </Form.Label>
          <Form.Control
            type='text'
            id='userNameControl3'
            name='UserName'
            defaultValue={user.UserName}
            onChange={e => handleUserUpdate(e)}
            placeholder='Enter a username'
            required />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor='passwordControl3'>
            Password:
          </Form.Label>
          <Form.Control
            type='password'
            id='passwordControl3'
            name='Password'
            onChange={e => handleUserUpdate(e)}
            minLength='8'
            placeholder='Enter a password' />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor='emailControl2'>
            Email:
          </Form.Label>
          <Form.Control
            type='email'
            id='emailControl2'
            name='Email'
            defaultValue={user.Email}
            onChange={e => handleUserUpdate(e)}
            placeholder='Enter an email' />
        </Form.Group>
        
        <button variant='primary' type='submit'>
          Update
        </button>
      </Form>
    </>
  )
}

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}