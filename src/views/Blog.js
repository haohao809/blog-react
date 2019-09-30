import React from "react";
import { Table, Button } from "element-react";
import utils from "../utils/utils.js"

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
          width: 100,
          render: (item)=>{
            return <span><Button type="text" size="small" onClick={this.openDeatil.bind(this,item)}>查看</Button><Button type="text" onClick={this.openEdit.bind(this,item)} size="small">编辑</Button></span>                  
          }
        }
      ],
      data: []
    };
    this.openDeatil = this.openDeatil.bind(this);
    this.openEdit = this.openEdit.bind(this);
  }
  componentWillMount (){
    this.getBlogList()
  }
  render() {
    const styleComponent = {
        margin: "20px"
    }
    return (
      <div style={styleComponent}>
        <h1>博客</h1>
        <Table
          style={{ width: 800 }}
          columns={this.state.columns}
          maxHeight={200}
          data={this.state.data}
          border={true}
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
           date : utils.formatDateTime(new Date(item.createtime)),
           name : item.author,
           title: item.title,
           id: item.id,
         }
         list.push(obj)
      })
      this.setState({
         data: list
      })
    })
  }
  openDeatil(item) {
     console.log('item', item);
     this.props.history.push({ pathname:'/detail',state:{id : `${item.id}` } })
  }
  openEdit(item) {
      this.props.history.push({ pathname:'/edit',state:{id : `${item.id}` } })
  }
}
export default Blog;
