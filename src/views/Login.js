import React from "react"
import { Button, Input, Dialog, Form } from 'element-react';
import '../css/login.css'
import utils from "../utils/utils.js"
import '../css/index.css'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dialogVisible3: false
    };
    this.loginHandle = this.loginHandle.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  render() {
    return <div className="wrap">
      <Button onClick={() => this.setState({ dialogVisible3: true })}>登录</Button>
      <Dialog
        title="登录"
        visible={this.state.dialogVisible3}
        onCancel={() => this.setState({ dialogVisible3: false })}
      >
        <Dialog.Body>
          <Form model={this.state.form}>
            <Form.Item label="用户名" labelWidth="120">
              <Input value={this.state.username} onChange={this.changeUsername}></Input>
            </Form.Item>
            <Form.Item label="密码" labelWidth="120">
              <Input value={this.state.password} onChange={this.changePassword}></Input>
            </Form.Item>
          </Form>
        </Dialog.Body>

        <Dialog.Footer className="dialog-footer">
          <Button onClick={() => this.setState({ dialogVisible3: false })}>取 消</Button>
          <Button type="primary" onClick={this.loginHandle}>确 定</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  }
  loginHandle() {
    console.log(this.state.username);
    console.log(this.state.password);
    const username = this.state.username;
    const password = this.state.password;
    utils.postData('/api/users/login', { username: username, password: password })
      .then(data => {
        if (data.errorCode === 0) {
          console.log('登录成功');
          this.setState({
            dialogVisible3: false
          })
          utils.open(0);
        } else {
          console.log(data.message);
          utils.open(1);
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

