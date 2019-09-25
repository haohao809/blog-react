import React from "react"
class Login extends React.Component {
    render() {
      return <div>
      <div>用户名:<input /></div>
      <div>密码:<input /></div>
      <button style={{width:"100",height:"100"}} onClick={this.loginHandle}>登录</button>
  </div>
    }
    loginHandle() {
      console.log('登录');
    }
}
export default Login

