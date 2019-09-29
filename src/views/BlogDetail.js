import React from "react";
class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount (){
        console.log('id',this.props.location.state.id);
    }
        render() {
            return <div>详情</div>
        }
}
export default BlogDetail
