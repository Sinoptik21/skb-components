import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Component from 'lsk-general/General/Component';
import cx from 'classnames';
import css from 'importcss';
import omit from 'lodash/omit';
// import { autobind } from 'core-decorators';

import Check from 'react-icons/lib/fa/check';
import Refresh from 'react-icons/lib/fa/refresh';
import Close from 'react-icons/lib/fa/close';

const BUTTON_STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NONE: '',
};

@css(require('./StatusButton.css'))
export default class StatusButton extends Component {

  static defaultProps = {
    status: BUTTON_STATE.NONE,
    bsStyle: 'default',
    children: 'Отправить',
    promise: null,
    styleName: '',
    timeout: 2000,

    // disabled: false,
    pendingText: '',
    fulfilledText: '',
    rejectedText: '',
  }

  static propTypes = {
    status: PropTypes.oneOf(Object.keys(BUTTON_STATE).map(k => BUTTON_STATE[k])),
    children: PropTypes.any,
    promise: PropTypes.any,
    bsStyle: PropTypes.string,
    styleName: PropTypes.string,
    timeout: PropTypes.number,

    // disabled: PropTypes.bool,
    pendingText: PropTypes.string,
    fulfilledText: PropTypes.string,
    rejectedText: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: props.promise ? BUTTON_STATE.LOADING : props.status,
    };
    this.resolvePromise(props.promise);
  }

  componentWillReceiveProps(nextProps) {
    this.resolvePromise(nextProps.promise);
    if (!nextProps.promise) {
      this.setState({ status: nextProps.status });
    }
  }

  resolvePromise(promise) {
    const { status } = this.state;
    if (!promise) return;
    if (status !== BUTTON_STATE.LOADING) {
      this.setState({ status: BUTTON_STATE.LOADING });
    }
    promise
      .then(() => this.finishStatus(BUTTON_STATE.SUCCESS))
      .catch(() => this.finishStatus(BUTTON_STATE.ERROR));
  }

  finishStatus(status) {
    this.setState({ status });
    setTimeout(() => this.setState({ status: BUTTON_STATE.NONE }), this.props.timeout);
  }

  convertStatus(status) {
    switch (status) {
      case 'loading':
        return <Refresh />;
      case 'success':
        return <Check />;
      case 'error':
        return <Close />;
      default:
        return '';
    }
  }

  render() {
    const { status } = this.state;
    const {
      children,
      bsStyle,
      styleName,
      pendingText,
      fulfilledText,
      rejectedText,
    } = this.props;

    // const style = cx({
    //   default: status === BUTTON_STATE.NONE ||
    //     status === BUTTON_STATE.LOADING ||
    //     status === BUTTON_STATE.DISABLED,
    //   success: status === BUTTON_STATE.SUCCESS,
    //   danger: status === BUTTON_STATE.ERROR,
    // });

    const processing = ['loading', 'error', 'success'].includes(status);
    const style = cx({
      default: ['none', 'loading', 'disabled'].includes(status),
      success: status === BUTTON_STATE.SUCCESS,
      danger: status === BUTTON_STATE.ERROR,
      loading: status === BUTTON_STATE.LOADING,
      processing: ['loading', 'error', 'success'].includes(status),
    });
    const disabled = status === BUTTON_STATE.DISABLED;

    // return (
    //   <div {...containerProps}>
    //     <Button
    //       bsStyle={bsStyle}
    //       type={type}
    //       form={form}
    //       className={`${classNamespace}button`}
    //     >
    //       <span>{children}</span>
    //       <svg className={`${classNamespace}progress-circle`} viewBox="0 0 41 41">
    //         <path d="M38,20.5 C38,30.1685093 30.1685093,38 20.5,38" />
    //       </svg>
    //       <svg className={`${classNamespace}checkmark`} viewBox="0 0 70 70">
    //         <path d="m31.5,46.5l15.3,-23.2" />
    //         <path d="m31.5,46.5l-8.5,-7.1" />
    //       </svg>
    //       <svg className={`${classNamespace}cross`} viewBox="0 0 70 70">
    //         <path d="m35,35l-9.3,-9.3" />
    //         <path d="m35,35l9.3,9.3" />
    //         <path d="m35,35l-9.3,9.3" />
    //         <path d="m35,35l9.3,-9.3" />
    //       </svg>
    //     </Button>
    //   </div>
    // );

    let stateText;
    let bsStyleType;
    switch (status) {
      case 'loading':
        stateText = pendingText;
        bsStyleType = 'default';
        break;
      case 'success':
        stateText = fulfilledText;
        bsStyleType = 'success';
        break;
      case 'error':
        stateText = rejectedText;
        bsStyleType = 'danger';
        break;
      default:
        stateText = '';
    }

    return (
      <Button
        {...omit(this.props, ['status', 'promise', 'timeout', 'pendingText', 'fulfilledText', 'rejectedText'])}
        styleName={`StatusButton ${styleName} ${style}`}
        bsStyle={bsStyleType || bsStyle}
        disabled={disabled}
      >
        <span style={{ visibility: processing ? 'hidden' : 'visible' }}>
          {children}
        </span>
        <div
          styleName={cx({
            animate: true,
            spin: status === BUTTON_STATE.LOADING,
          })}
        >
          {this.convertStatus(status)}
        </div>
        <div
          styleName={cx({
            animate: true,
          })}
        >{stateText}</div>
      </Button>
    );
  }
}
