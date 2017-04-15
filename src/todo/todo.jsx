import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.state = { 
             description:'', 
             list:[]
        }
        this.refresh()
    }

    handleClear(){
        this.refresh()
    }

    handleSearch(todo){
        this.refresh(this.state.description)
    }


    refresh(description = ''){
        const search =  description ? `&description__regex=/${description}/`:''
        console.log(search)
        console.log(`${URL}?sort=-createAt${search}`)
        axios.get(`${URL}?sort=-createAt${search}`)
        .then( resp => this.setState({...this.state,description: description,list: resp.data}) )
    }


    handleMarkAsDone(todo){
        console.log(todo)
        axios.put(`${URL}/${todo._id}`,{...todo, done:true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`,{...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description) )
    }



    handleChange(e){
        this.setState({...this.state,description: e.target.value })
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
            .then( this.refresh ) 
    }



    render(){
        return(
            <div >
                <PageHeader name='tarefas' small='cadastro' />
                <TodoForm 
                    description={this.state.description} 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    />
                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove} 
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
            </div>
        )
    }
}

