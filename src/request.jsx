import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnec = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAne = (ane) => {
    axios.post(baseUrl, ane).then(res => res.data)

}

export const updateAne = ane =>
    axios.put(`${baseUrl}/${ane.id}`, ane)
        .then(res => res.data)
