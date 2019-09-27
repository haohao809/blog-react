import React from "react";
import { Table } from "element-react";
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
           title: item.title
         }
         list.push(obj)
      })
      this.setState({
         data: list
      })
    })
  }
}
export default Blog;
