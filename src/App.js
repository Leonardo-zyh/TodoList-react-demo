import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog'
import {getCurrentuser,signOut} from './leanCloud'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:getCurrentuser || {},
      newtodo:'', 
      todoLest: []
    }
  }
  render() {
    let todos = this.state.todoLest

    .filter((item)=> !item.deleted)
    .map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem content={item} onToggle={this.toggle.bind(this)} 
          onDelete={this.deleted.bind(this)} />
        </li>
      )
    })
    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}         
        </h1>
        <div className='inputW  rapper'>
        <TodoInput content={this.state.newtodo}
        onChange={this.changeTitle.bind(this)}
        onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className='todoList' >
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog 
          onSignUp={this.onSignUpOrSignIn.bind(this)} 
          onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    );
  }
  
  

  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)  
  }
  componentDidUpdate() {   
  }
  toggle(e,content){
    content.status = content.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    
  }
  changeTitle(event){
    this.setState({
      newtodo:event.target.value,
      todoLest:this.state.todoLest
    })
  }
  addTodo(event){
    this.state.todoLest.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false,
    })
    this.setState({
      newtodo:'',
      todoLest:this.state.todoLest
    })
  }
  deleted(event,todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;

let id = 0
function idMaker(){
  id+=1
  return id
}
