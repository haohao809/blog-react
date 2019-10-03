import React from "react";
import { Table, Button, Message, Dialog } from "element-react";
import utils from "../utils/utils.js";

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
          width: 150,
          render: item => {
            return (
              <span>
                <Button
                  type="text"
                  size="small"
                  onClick={this.openDeatil.bind(this, item)}
                >
                  查看
                </Button>
                <Button
                  type="text"
                  onClick={this.openEdit.bind(this, item)}
                  size="small"
                >
                  编辑
                </Button>
                <Button
                  type="text"
                  onClick={this.delBlog.bind(this, item)}
                  size="small"
                >
                  删除
                </Button>
              </span>
            );
          }
        }
      ],
      data: [],
      dialogVisible: false
    };
    this.openDeatil = this.openDeatil.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.confirmDel = this.confirmDel.bind(this);
    this.delBlog = this.delBlog.bind(this);
    this.newBlog = this.newBlog.bind(this);
  }
  componentWillMount() {
    this.getBlogList();
  }
  render() {
    const styleComponent = {
      margin: "20px"
    };
    const buttonComponent = {
      marginTop: "20px"
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
        />
        <Button onClick={this.newBlog} style={buttonComponent}>新建博客</Button>
        <Dialog
          title="提示"
          size="tiny"
          visible={this.state.dialogVisible}
          onCancel={() => this.setState({ dialogVisible: false })}
          lockScroll={false}
        >
          <Dialog.Body>
            <span>确定要删除吗</span>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={() => this.setState({ dialogVisible: false })}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={this.confirmDel}
            >
              确定
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
  getBlogList() {
    fetch("/api/blogs/list")
      .then(res => res.json())
      .then(listData => {
        const data = listData.data;
        let list = [];
        data.forEach(item => {
          let obj = {
            date: utils.formatDateTime(new Date(item.createtime)),
            name: item.author,
            title: item.title,
            id: item.id
          };
          list.push(obj);
        });
        this.setState({
          data: list
        });
      });
  }
  // 查看详情
  openDeatil(item) {
    console.log("item", item);
    this.props.history.push({
      pathname: "/detail",
      state: { id: `${item.id}` }
    });
  }
  // 新建博客
  newBlog () {
    this.props.history.push({ pathname: "/edit"});
  }
  // 编辑博客
  openEdit(item) {
    this.props.history.push({ pathname: "/edit", state: { id: `${item.id}` } });
  }
  // 删除博客
  delBlog(item) {
    console.log('item',item);
      this.setState({
        dialogVisible: true
      })
      this.currentId = item.id;   //设置全局变量
  }
  // 确认删除博客
  confirmDel(){
     const id= this.currentId;
     console.log('id',id);
     utils
     .postData(`/api/blogs/del?id=${id}`)
     .then(data => {
       if (data.errorCode === 0) {
         console.log("删除成功");
         this.open(0);
         this.getBlogList();
       } else {
         console.log(data.message);
         this.open(1);
       }
     })
     .catch(err => console.log("err", err));
  }
  // 消息框
  open(value) {
    let text = "";
    let type = "";
    if (value === 0) {
      text = "成功";
      type = "success";
    } else {
      text = "失败";
      type = "error";
    }
    Message({
      message: text,
      type: type
    });
  }
}
export default Blog;
