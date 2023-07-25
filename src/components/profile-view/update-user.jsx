import React from 'react'
import Form from 'react-bootstrap/From'

export default function UpdateUser({ user, handleSubmit, handleUpdate }) {
  return (
    <>
      <h4>Update</h4>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group>
          <Form.label htmlFor='userNameControl3'>
            Username:
          </Form.label>
          <Form.Control
            type='text'
            id='userNameControl3'
            name='Username'
            defaultValue={user.UserName}
            onChange={e => handleUpdate(e)}
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
            defaultValue={user.Password}
            onChange={e => handleUpdate(e)}
            placeholder='Enter a password'
            required />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor='emailControl2'>
            Email:
          </Form.Label>
          <input
            type='email'
            id='emailControl2'
            name='Email'
            defaultValue={user.Email}
            onChange={e => handleUpdate(e)}
            placeholder='Enter an email'
            required />
        </Form.Group>
        
        <button variant='primary' type='submit'>
          Update
        </button>
      </Form>
    </>
  )
}
