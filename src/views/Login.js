import React from "react"
import { Button, Input } from 'element-react';
import '../css/login.css'
import utils from "../utils/utils.js"
class Login extends React.Component {
  constructor(props){
      super(props);
      this.state ={
         username : '',
         password : ''
      };
      this.loginHandle = this.loginHandle.bind(this);
      this.changeUsername = this.changeUsername.bind(this);
      this.changePassword = this.changePassword.bind(this);
  }

    render() {
      return <div>
      <div>用户名:<Input placeholder="请输入用户名" value={this.state.username} onChange={this.changeUsername}/></div>
      <div>密  码:<Input placeholder="请输入密码" value={this.state.password} onChange={this.changePassword}/></div>
      <Button  onClick={this.loginHandle}>登录</Button>
  </div>
    }
    loginHandle() {
      console.log(this.state.username);
      console.log(this.state.password);
      const username = this.state.username;
      const password = this.state.password;
      utils.postData('/api/users/login',{username:username,password:password})
      .then(data => 
        {
          if (data.errorCode === 0) {
            console.log('登录成功');
          } else {
            console.log(data.message);
          }
          
        }
      )
      .catch(err => console.log('err', err))

    }
    changeUsername(event) {
        this.setState({
          username: event
        })
    }
    changePassword(event) {
      this.setState({
        password: event
      })
    }
}
export default Login

