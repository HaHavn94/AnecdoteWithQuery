import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnec, updateAne, createAne } from './request'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createAne,
    onSuccess: (newAne) => {
      const anes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anes.concat(newAne))
    }
  })


  const addAne = async (event) => {
    event.preventDefault()
    const content = event.target.ane.value
    event.target.ane.value = ''
    newNoteMutation.mutate({ content: content, votes: 0 })

  }

  const updateAneMutation = useMutation(updateAne, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAneMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnec,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdocte service not available due to problems in server</span>
  }

  const anecs = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAne={addAne} />

      {anecs.map(anecdote =>
        <div key={anecdote?.id}>
          <div>
            {anecdote?.content}
          </div>
          <div>
            has {anecdote?.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
