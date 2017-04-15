const INITIAL_STATE = {
    description: '',
    list: []
}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'DESCRIPTION_CHANGED':
            return {...state, description: action.playload}
        case 'TODO_SEARCHED':
            console.log(action.playload)
            //return {...state, list: [{createAt:"2017-04-11T21:37:10.443Z",description:"viajar para recife em maio", done: true, __v:0,        _id:"58ed4c863b763a21888bb85d"    }]}
            return {...state, list: action.playload.data}
        default:
            return state
    }
}
