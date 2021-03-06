import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render() {
        return (
            <form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
            <div className="row signIn">
              <label>账号</label>
              <input type="text" placeholder="邮箱地址、账号"  value={this.props.formData.username}
                onChange={this.props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row signIn">
              <label>密码</label>
              <input type="password" value={this.props.formData.password}
                onChange={this.props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row actions">
              <button type="submit" >登录</button>
              <a href="# " onClick={this.props.onForgotPassword}>找回密码</a>
            </div>
          </form>
        )
    }

}