import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';
// import Avatar from '../Avatar';
import Remarkable from 'remarkable';
// import { autobind } from 'core-decorators';

export default class Comment extends Component {

  static defaultProps = {
    onCommentClose: () => {},
  }

  static propTypes = {
    key: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onCommentClose: PropTypes.func,
  }

  // @autobind
  rawMarkup() {
    const md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  handleRemove() {
    this.props.onCommentClose(this.props.key);
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <button className="close" onClick={this.handleRemove}>&times;</button>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}
