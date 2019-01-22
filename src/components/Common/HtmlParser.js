import React, { Component } from "react";

let content = '';
class HtmlParser extends Component {
    constructor(props) {
        super(props);
    }

    contentToHtml = (content) => {
        return {__html: content};
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={this.contentToHtml(this.props.content)}></div>
        )
    }
}

export default HtmlParser;
