import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';

export default class StatusButton extends Component {

  static defaultProps = {
    text: 'Button',
    state: 'none',
  }

  static propTypes = {
    text: PropTypes.string,
    state: PropTypes.oneOf(['none', 'loading', 'success', 'error']),
  }

  render() {
    return (
      <button>{this.props.text}</button>
    );
  }
}
