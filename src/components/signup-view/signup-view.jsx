import { useState } from 'react'

export const SignupView = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      FirstName: firstname,
      LastName: lastname,
      UserName: username,
      Password: password,
      Email: email,
      DOB: birthday
    }

    fetch('https://list-o-movies-311c22237892.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        alert('Signup successful')
        window.location.reload()
      } else alert('Signup failed')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Firstname:
        <input
          type="text"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          required
        />
      </label>
      <label>
        Lastname:
        <input
          type="text"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          minLength='5'
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}