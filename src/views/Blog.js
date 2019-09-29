import React from "react";
import { Table, Button } from "element-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { formatDateTime } from "../utils/utils.js"

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "日期",
          prop: "date",
          width: 200
        },
        {
          label: "作者",
          prop: "name",
          width: 180
        },
        {
          label: "标题",
          prop: "title"
        },
        {
          label: "操作",
          prop: "zip",
          fixed: 'right',
          width: 100,
          render: ()=>{
            return <span><Button type="text" size="small">查看</Button></span>
          }
        }
      ],
      data: []
    };
  }
  componentWillMount (){
    this.getBlogList()
  }
  render() {
    return (
      <div>
        <h1>博客</h1>
        <Table
          style={{ width: 1000 }}
          columns={this.state.columns}
          maxHeight={200}
          data={this.state.data}
          onCurrentChange={item=>{this.changeColumns(item)}}
        />
      </div>
    );
  }
  getBlogList() {
    fetch('/api/blogs/list').then(res => res.json()).then(listData =>{
      const data = listData.data;
      let list = [];
      data.forEach((item) => {
         let obj = {
           date : formatDateTime(new Date(item.createtime)),
           name : item.author,
           title: item.title,
           id: item.id
         }
         list.push(obj)
      })
      this.setState({
         data: list
      })
    })
  }
  changeColumns(item) {
    console.log(item.id);
    this.setState({
       id: item.id
    })
    this.props.history.push({ pathname:'/detail',state:{id : `${item.id}` } })
  }
}
export default Blog;
