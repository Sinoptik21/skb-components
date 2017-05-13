import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';
import Comment from '../Comment';

export default class CommentList extends Component {

  static defaultProps = {
    data: [],
  }

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const commentNodes = this.props.data.map(comment =>
      (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      ),
    );
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}
