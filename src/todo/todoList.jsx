import React from 'react'
import IconButton from '../template/iconButton'

import {connect} from 'react-redux'


const TodoList = props => {
    const renderRows = () =>{
        const list = props.list || []
        return list.map( todo => (
                <tr key={todo._id}  >
                    <td className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
                    <td>
                        <IconButton
                            hide={todo.done}
                            style='success'
                            icon='check'
                            onClick={() => props.handleMarkAsDone(todo) }></IconButton>                        
                        <IconButton
                            hide={!todo.done}
                            style='warning'
                            icon='undo'
                            onClick={() => props.handleMarkAsPending(todo) }></IconButton>                                                    
                        <IconButton
                            hide={!todo.done}
                            style='danger'
                            icon='trash'
                            onClick={() => props.handleRemove(todo) }></IconButton>
                    </td>
                </tr>
            )
        )
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th> Descrição </th>
                </tr>
                <tr>
                    <th className='tableActions'    >Ações</th>
                </tr>                
             </thead>
             <tbody>
                 {renderRows()}       
             </tbody>
         </table>

    )
}

const mapStateToProps = state => ({ list : state.todo.list})
export default connect(mapStateToProps)(TodoList)



