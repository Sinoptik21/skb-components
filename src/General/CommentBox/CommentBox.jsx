import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';
// import Avatar from '../Avatar';
// import Remarkable from 'remarkable';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { autobind } from 'core-decorators';

const data = [
  { id: 1, author: 'Pete Hunt', text: 'This is one comment' },
  { id: 2, author: 'Jordan Walke', text: 'This is *another* comment' },
];

export default class CommentBox extends Component {

  static defaultProps = {
    // data: [],
    url: 'comments.json',
    pollInterval: 2000,
  }

  static propTypes = {
    // data: PropTypes.array,
    // url: PropTypes.string,
    pollInterval: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  @autobind
  loadCommentsFromServer() {
    this.setState({ data });
  }

  @autobind
  handleCommentSubmit(comment) {
    const comments = this.state.data;
    comment.id = Date.now();
    const newComments = comments.concat([comment]);
    this.setState({ data: newComments });
  }

  @autobind
  handleCommentRemove(key) {
    const comments = this.state.data.slice();
    comments.splice(key, 1);
    this.setState({ data: comments });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} onCommentClose={this.handleCommentRemove} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
