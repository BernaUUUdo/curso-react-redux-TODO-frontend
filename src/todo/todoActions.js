import axios from 'axios'
const URL = 'http://localhost:3003/api/todos'


export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    playload: event.target.value
})


export const  search = () => {
    const request =  axios.get(`${URL}?sort=-createAt`)
    console.log('search at '+`${URL}?sort=-createAt`)
    return {
        type: 'TODO_SEARCHED',
        playload: request
    }
}