import React from "react";
import { Table, Button, Dialog, MessageBox } from "element-react";
import utils from "../utils/utils.js";
import BlogDetail from './BlogDetail.js'
import BlogEdit from './BlogEdit.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.location.pathname === '/blog') {
      this.setState({
        showorhide: {
          display: "block"
        }
      })
    }
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
        <div style={this.state.showorhide}>
          <h1>博客</h1>
          <Table
            style={{ width: 800 }}
            columns={this.state.columns}
            maxHeight={200}
            data={this.state.data}
            border={true}
          />
          <Button onClick={this.newBlog} style={buttonComponent}>新建博客</Button>
        </div>
        <Route path="/blog/detail" component={BlogDetail} />
        <Route path="/blog/edit" component={BlogEdit} />
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
        console.log('listData', listData);
        if (listData.errorCode === 0) {
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
        } else if (listData.errorCode === -1) {
          MessageBox.alert('请先登录之后再查看', '未登录',{showClose:false}).then(() => {
            this.props.history.push({
              pathname: "/"
            });
          });

        }
      });
  }
  // 查看详情
  openDeatil(item) {
    console.log("item", item);
    this.setState({
      showorhide: {
        display: "none"
      }
    })
    this.props.history.push({
      pathname: "/blog/detail",
      state: { id: `${item.id}` }
    });
  }
  // 新建博客
  newBlog() {
    this.setState({
      showorhide: {
        display: "none"
      }
    })
    this.props.history.push({ pathname: "/blog/edit" });
  }
  // 编辑博客
  openEdit(item) {
    this.setState({
      showorhide: {
        display: "none"
      }
    })
    this.props.history.push({ pathname: "/blog/edit", state: { id: `${item.id}` } });
  }
  // 删除博客
  delBlog(item) {
    console.log('item', item);
    this.setState({
      dialogVisible: true
    })
    this.currentId = item.id;   //设置全局变量
  }
  // 确认删除博客
  confirmDel() {
    const id = this.currentId;
    console.log('id', id);
    utils
      .postData(`/api/blogs/del?id=${id}`)
      .then(data => {
        if (data.errorCode === 0) {
          console.log("删除成功");
          utils.open(0);
          this.setState({
            dialogVisible: false
          })
          this.getBlogList();
        } else {
          console.log(data.message);
          utils.open(1);
        }
      })
      .catch(err => console.log("err", err));
  }
}
export default Blog;
