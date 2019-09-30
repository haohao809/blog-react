import React from "react";
import utils from "../utils/utils.js"
import '../css/index.css'
class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            time: 0,
            author: ''
        }
    }
    componentWillMount (){
        console.log('id',this.props.location.state.id);
        const id = this.props.location.state.id;
        this.getDetail(id);
    }
    render() {
        return <div className="wrap">
            <h1>{this.state.title}</h1>
            <div>
                <span>时间: {this.state.time}</span>
                <span>作者: {this.state.author}</span>
            </div>
            <div>
                {this.state.content}
            </div>
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
}
export default BlogDetail
