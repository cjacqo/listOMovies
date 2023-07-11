import React from 'react'
import { useState } from 'react'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      access: username,
      secret: password
    }

    fetch('https://list-o-movies-311c22237892.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) onLoggedIn(username)
      else alert('Login failed')
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}