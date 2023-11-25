

const AnecdoteForm = (props) => {

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={props.addAne}>
        <input name='ane' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
