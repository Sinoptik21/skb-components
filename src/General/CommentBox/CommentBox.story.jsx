import React from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList/CommentList';
import CommentForm from './CommentForm';
import Comment from './Comment';

const data = [
  { id: 1, author: 'Pete Hunt', text: 'This is one comment' },
  { id: 2, author: 'Jordan Walke', text: 'This is *another* comment' },
];

module.exports = function ({ storiesOf }) {
  return storiesOf('Comment', module)
    .add('Comment box', () => (
      <CommentBox url="comments.json" />
    ))
    .add('Comment list', () => (
      <CommentList data={data} />
    ))
    .add('Comment form', () => (
      <CommentForm />
    ))
    .add('One comment', () => (
      <Comment author="John Smith">Text</Comment>
    ));
};
