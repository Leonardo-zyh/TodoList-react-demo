import React, { Component } from 'react';
import './UserDialog.css'

export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signUp',
      fromData: {
        username: '',
        password: '',
      }

    }
  }
  switch(e) {
    this.setState({
      selected: e.target.value
    })
  }
  signUp(e) { }
  signIn(e) { }
  changeUsername(e) {
    // this.state.formData.username = e.target.value
    // this.setState(this.state)
    // 像上面这样写会看到一个警告 warning  Do not mutate state directly. Use setState()
    let stateCope = JSON.parse(JSON.stringify(this.state))  //JSON深拷贝
    stateCope.fromData.username = e.target.value
    this.setState(stateCope)
  }
  changePassword(e){    
    let stateCope = JSON.parse(JSON.stringify(this.state))  //JSON深拷贝
    stateCope.fromData.username = e.target.value
    this.setState(stateCope)
  }


  render() {
    let signUpFrom = (<form className="signUp" onSubmit={this.signUp.bind(this)} > {/* 注册*/}
      <div className="row">
        <label>用户名</label>
        <input type="text" value={this.state.fromData.username} 
        onChange={this.changeUsername.bind(this)}/>        
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={this.state.fromData.password} 
        onChange={this.changePassword.bind(this)}/>        
      </div>
      <div className="row actions">
        <button type="submit">注册</button>
      </div>
    </form>)
    let signInFrom = (<form className="signIn" onSubmit={this.signIn.bind(this)} > {/* 登录*/}
      <div className="row">
        <label>用户名</label>
        <input type="text" value={this.state.fromData.username} 
        onChange={this.changeUsername.bind(this)}/>
        
      </div>
      <div className="row">
        <label>密码</label>
        <input type="password" value={this.state.fromData.password} 
        onChange={this.changePassword.bind(this)}/>
        
      </div>
      <div className="row actions">
        <button type="submit">登录</button>
      </div>
    </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange={this.switch.bind(this)} >
            <label><input type="radio" value='signUp' checked={this.state.selected === 'signUp'} /> 注册</label>
            <label><input type="radio" value='signIn' checked={this.state.selected === 'signIn'} /> 登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpFrom : null}
            {this.state.selected === 'signIn' ? signInFrom : null}
          </div>
        </div>
      </div>
    )            //判断selected，执行变量
  }
}