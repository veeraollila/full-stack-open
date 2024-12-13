import axios from 'axios'

const baseUrl = 'mongodb+srv://fullstack:test@cluster0.ccw9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const getAll = () => {
  return axios.get(baseUrl)
}

export const create = newContact => {
  return axios.post(baseUrl, newContact)
}

export const deleteContact = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export const updateContact = (id, updatedContact) => {
  return axios.put(`${baseUrl}/${id}`, updatedContact)
}