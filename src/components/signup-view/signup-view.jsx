import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    <div className='mx-3 my-4'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='row gy-2 gx-3 justify-content-center align-items-center'>
        <Row className='mb-3'>
          <Col>
            <label
              htmlFor='firstNameControl1'
              className='col-form-label col-form-label-sm'>
                First Name:
            </label>
            <input
              type='text'
              className='form-control'
              id='firstNameControl1'
              placeholder='First name...'
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='lastNameControl1'
              className='col-form-label col-form-label-sm'>
                Last Name:
            </label>
            <input
              type='text'
              className='form-control'
              id='lastNameControl1'
              placeholder='Last name...'
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <label
              htmlFor='userNameControl2'
              className='col-form-label col-form-label-sm col-sm-3'>
              Username:
            </label>
            <input
              type='text'
              className='form-control'
              id='userNameControl2'
              placeholder='Username...'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              minLength='5'
            />
          </Col>
          <Col>
            <label
              htmlFor='passwordControl2'
              className='col-form-label col-form-label-sm col-sm-3'>
              Password:
            </label>
            <input
              type='password'
              className='form-control'
              id='passwordControl2'
              placeholder='Password...'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <label
              htmlFor='emailControl1'
              className='col-form-label col-form-label-sm col-sm-3'>
              Email:
            </label>
            <input
              type='email'
              className='form-control'
              id='emailControl1'
              placeholder='Email...'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='birthdayControl1'
              className='col-form-label col-form-label-sm col-sm-3'>
              Birthday:
            </label>
            <input
              type='date'
              className='form-control'
              id='birthdayControl1'
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <button
            type='submit'
            className='btn btn-primary col-sm-12'>Submit</button>
        </Row>
      </form>
    </div>
  )
}