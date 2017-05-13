import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';

export default class CommentForm extends Component {

  static defaultProps = {
    onCommentSubmit: () => {},
  }

  static propTypes = {
    onCommentSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: '',
    };
  }

  @autobind
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  @autobind
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <textarea
          rows="3"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
