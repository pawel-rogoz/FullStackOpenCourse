const Message = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: 'red',
    fontSize: 16,
  }

  const addedStyle = {
    color: 'green',
    fontSize: 16,
  }

  if (isError) {
    return (
      <div className='message' style={errorStyle}>
        {message}
      </div>
    )
  }

  return (
    <div className='message' style={addedStyle}>
      {message}
    </div>
  )
}

export default Message