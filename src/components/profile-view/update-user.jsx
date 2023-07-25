import React from 'react'

export default function UpdateUser({ user, handleSubmit, handleUpdate }) {
  return (
    <form className='profile-form' onSubmit={e => handleSubmit(e)}>
      <h2>Want to change some info?</h2>
      <label
        htmlFor='userNameControl3'>
        Username:
      </label>
      <input
        type='text'
        id='userNameControl3'
        name='Username'
        defaultValue={user.UserName}
        onChange={e => handleUpdate(e)} />
      <label
        htmlFor='passwordControl3'>
        Password:
      </label>
      <input
        type='password'
        id='passwordControl3'
        name='Password'
        defaultValue={user.Password}
        onChange={e => handleUpdate(e)} />
      <label
        htmlFor='emailControl2'>
        Email:
      </label>
      <input
        type='email'
        id='emailControl2'
        defaultValue={user.Email}
        onChange={e => handleUpdate(e)} />
      <button variant='primary' type='submit'>
        Update
      </button>
    </form>
  )
}
