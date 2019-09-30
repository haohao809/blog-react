import React from "react";
import { Button, Input, Message } from 'element-react';
import { formatDateTime } from "../utils/utils.js"
import utils from "../utils/utils.js"
import '../css/blogEdit.css'
import '../css/index.css'
class BlogEdit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.saveBlog = this.saveBlog.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContent = this.changeContent.bind(this);
    }
    componentWillMount (){
        console.log('id',this.props.location.state.id);
        const id = this.props.location.state.id;
        this.getDetail(id);
    }
    render() {
        return <div className="wrap">
            <h1>编辑博客</h1>
            <Input value={this.state.title} onChange={this.changeTitle}></Input>
            <Input type="textarea" autosize={true} value={this.state.content} onChange={this.changeContent}></Input>
            <Button onClick={this.saveBlog}>保存</Button>
        </div>
    }
    getDetail(id) {
        fetch(`/api/blogs/detail?id=${id}`).then(res => res.json()).then(data =>{
            console.log('deatilData',data);
            if(data.errorCode === 0){
                const detailData = data.data;
                this.setState({
                    title: detailData.title,
                    content: detailData.content,
                    time: utils.formatDateTime(new Date(detailData.createtime)),
                    author: detailData.author
                })
            }

        })        
    }
    // 更新博客
    saveBlog() {
        const id = this.props.location.state.id;
        const title = this.state.title;
        const content = this.state.content;
        const param = {
            title,
            content
        }
        utils.postData(`/api/blogs/update?id=${id}`, param)
        .then(data => 
          {
            if (data.errorCode === 0) {
              console.log('保存成功');
              this.open(0)
            } else {
              console.log(data.message);
              this.open(1)
            }
            
          }
        )
        .catch(err => console.log('err', err))

    }
    // 监听titile变化
    changeTitle(e) {
        this.setState({
            title: e
        })
    }
    // 监听titile变化
    changeContent(e) {
        this.setState({
            content: e
        })
    }
    // 消息框
    open (value) {
        let text = '';
        let type = '';
        if (value === 0) {
            text = '成功';
            type = 'success';
        } else {
            text = '失败';
            type = 'error';
        }
        Message({
            message: text,
            type: type
        })
    }
}
export default BlogEdit;