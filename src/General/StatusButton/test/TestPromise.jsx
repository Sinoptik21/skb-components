import React, { PropTypes } from 'react';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';
import StatusButton from '../StatusButton';
import omit from 'lodash/omit';

export default class TestPromise extends Component {

  static defaultProps = {
    error: false,
    promiseTimeout: 2000,
    onClick: () => {},
  }

  static propTypes = {
    error: PropTypes.bool,
    promiseTimeout: PropTypes.number,
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
  }

  @autobind
  getData() {
    this.promise = new Promise((resolve, reject) => {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        return this.props.error ? reject(false) : resolve(true);
      }, this.props.promiseTimeout);
    });

    this.setState({ fetching: true });

    return this.promise;
  }

  @autobind
  async handleClick() {
    const result = await this.getData();
    return this.props.onClick && this.props.onClick(result);
  }

  render() {
    return (
      <StatusButton
        {...omit(this.props, ['promiseTimeout', 'error', 'success', 'loading'])}
        promise={this.promise}
        onClick={this.handleClick}
      />
    );
  }
}
