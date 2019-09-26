import React from "react"
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
      <div>用户名:<input value={this.state.username} onChange={this.changeUsername}/></div>
      <div>密码:<input value={this.state.password} onChange={this.changePassword}/></div>
      <button style={{width:"100",height:"100"}} onClick={this.loginHandle}>登录</button>
  </div>
    }
    loginHandle() {
      console.log('登录');
      console.log(this.state.username);
      console.log(this.state.password);
      const username = this.state.username;
      const password = this.state.password;
      this.postData('/api/users/login',{username:username,password:password})
      .then(data => console.log('data',data))
      .catch(err => console.log('err',err))

    }
    changeUsername(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
          username: value
        })
    }
    changePassword(event) {
      const target = event.target;
      const value = target.value;
      this.setState({
        password: value
      })
    }
    postData(url,data) {
      return fetch(url,{
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        referrer: 'no-referrer'

      }).then(res => res.json())
    }
}
export default Login

