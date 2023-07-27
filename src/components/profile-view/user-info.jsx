import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export function UserInfo({ name, email, handleUserDeactivation }) {
  return (
    <>
      <p>Username: {name}</p>
      <p>Email: {email}</p>
      <Button variant='danger' onClick={() => handleUserDeactivation()}>Deactivate</Button>
    </>
  )
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleUserDeactivation: PropTypes.func.isRequired
}