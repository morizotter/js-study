var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var request = require('superagent');
var CommentList_1 = require('./CommentList');
var CommentForm_1 = require('./CommentForm');
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox(props) {
        _super.call(this, props);
        this.state = { data: [] };
    }
    CommentBox.prototype.loadCommentsFromServer = function () {
        var _this = this;
        request
            .get(this.props.url)
            .end(function (err, res) {
            if (err) {
                console.error(_this.props.url);
                throw err;
            }
            console.log(res.body);
            _this.setState({ data: res.body });
        });
    };
    CommentBox.prototype.handleCommentSubmit = function (comment) {
        var _this = this;
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        request
            .post(this.props.url)
            .send(comment)
            .end(function (err, res) {
            if (err) {
                console.error(_this.props.url);
                _this.setState({ data: comments });
                throw err;
            }
            console.log(res.body);
            _this.setState({ data: res.body });
        });
        console.log("submit");
    };
    CommentBox.prototype.componentDidMount = function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    };
    CommentBox.prototype.render = function () {
        return (React.createElement("div", {"className": "commentBox"}, React.createElement(CommentList_1.default, {"data": this.state.data}), React.createElement(CommentForm_1.default, {"onCommentSubmit": this.handleCommentSubmit.bind(this)})));
    };
    return CommentBox;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentBox;
//# sourceMappingURL=CommentBox.js.map