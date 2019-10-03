import React from "react";
import { Button, Input, Message } from 'element-react';
import utils from "../utils/utils.js"
import '../css/blogEdit.css'
import '../css/index.css'
class BlogEdit extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            theme: ''
        }
        this.saveBlog = this.saveBlog.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContent = this.changeContent.bind(this);
    }
    componentWillMount (){        
        if(this.props.location.state) {
            const id = this.props.location.state.id;
            this.getDetail(id);
            this.setState({
                theme: '编辑博客'
            })
            console.log('1111')
        } else {
            this.setState({
                theme: '新建博客'
            })
            console.log('2222')
        }
        
    }
    render() {
        return <div className="wrap">
            <h1>{this.state.theme}</h1>
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
    // 保存
    saveBlog() {
        const title = this.state.title;
        const content = this.state.content;
        const param = {
            title,
            content
        }
        // 更新博客
        if(this.props.location.state) {
            const id = this.props.location.state.id;
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
        // 新建博客
        else {
            utils.postData(`/api/blogs/new`, param)
            .then(data => 
              {
                if (data.errorCode === 0) {
                  console.log('新建成功');
                  this.open(0)
                } else {
                  console.log(data.message);
                  this.open(1)
                }
                
              }
            )
            .catch(err => console.log('err', err))
        }


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