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
    fulFilledText: '',
    rejectedText: '',
    // loadingClass: 'sb--loading',
    // fulFilledClass: 'sb--fulfilled',
    // rejectedClass: 'sb--rejected',
    // classNamespace: 'sb-',
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
    fulFilledText: PropTypes.string,
    rejectedText: PropTypes.string,
    // loadingClass: PropTypes.string,
    // fulFilledClass: PropTypes.string,
    // rejectedClass: PropTypes.string,
    // classNamespace: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      status: props.promise ? BUTTON_STATE.LOADING : props.status,
    };
    this.resolvePromise(props.promise);
  }

  // ??
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
    setTimeout(() => this.setState({ status: '' }), this.props.timeout);
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

  // ?
  // componentWillUnmount() {
  //   this.isUnmounted = true;
  //   // ??
  //   clearTimeout(this._timeout);
  // }

  // ?
  // resetState() {
  //   this.setState({
  //     asyncState: null,
  //   });
  // }

  // ?
  // @autobind
  // handleClick(...args) {
  //   const clickHandler = this.props.onClick;
  //   if (typeof clickHandler === 'function') {
  //     this.setState({
  //       asyncState: 'pending',
  //     });
  //
  //     const returnFn = clickHandler.apply(null, args);
  //     if (returnFn && typeof returnFn.then === 'function') {
  //       returnFn.then(() => {
  //         if (this.isUnmounted) {
  //           return;
  //         }
  //         this.setState({
  //           asyncState: 'fulfilled',
  //         });
  //       }).catch((error) => {
  //         if (this.isUnmounted) {
  //           return;
  //         }
  //         this.setState({
  //           asyncState: 'rejected',
  //         });
  //         throw error;
  //       });
  //     } else {
  //       this.resetState();
  //     }
  //   }
  // }

  // handleClick(e) {
  //   if (this.props.controlled) {
  //     this.props.onClick(e);
  //     return true;
  //   }
  //
  //   if ((this.props.shouldAllowClickOnLoading ||
  //       this.state.currentState !== BUTTON_STATE.LOADING) &&
  //       this.state.currentState !== BUTTON_STATE.DISABLED
  //   ) {
  //     this.loading();
  //     const ret = this.props.onClick(e);
  //     this.handlePromise(ret);
  //   } else {
  //     e.preventDefault();
  //   }
  // }
  //
  // handlePromise(promise) {
  //   if (promise && promise.then && promise.catch) {
  //     promise
  //       .then(() => {
  //         this.success();
  //       })
  //       .catch((err) => {
  //         this.error(null, err);
  //       });
  //   }
  // }
  //
  // loading() {
  //   this.setState({ currentState: BUTTON_STATE.LOADING });
  // }
  //
  // notLoading() {
  //   this.setState({ currentState: BUTTON_STATE.NOTHING });
  // }
  //
  // enable() {
  //   this.setState({ currentState: BUTTON_STATE.NOTHING });
  // }
  //
  // disable() {
  //   this.setState({ currentState: BUTTON_STATE.DISABLED });
  // }
  //
  // success(callback, dontRemove) {
  //   this.setState({ currentState: BUTTON_STATE.SUCCESS });
  //   this._timeout = setTimeout(() => {
  //     if (!dontRemove) { this.setState({ currentState: BUTTON_STATE.NOTHING }); }
  //     callback = callback || this.props.onSuccess;
  //     if (typeof callback === 'function') { callback(); }
  //   }, this.props.durationSuccess);
  // }
  //
  // error(callback, err) {
  //   this.setState({ currentState: BUTTON_STATE.ERROR });
  //   this._timeout = setTimeout(() => {
  //     this.setState({ currentState: BUTTON_STATE.NOTHING });
  //     callback = callback || this.props.onError;
  //     if (typeof callback === 'function') { callback(err); }
  //   }, this.props.durationError);
  // }

  render() {
    // const {
    //   text,
    //   bsStyle,
    //   // ?
    //   // children,
    //   pendingText,
    //   fulFilledText,
    //   rejectedText,
    //   // className,
    //   loadingClass,
    //   fulFilledClass,
    //   rejectedClass,
    //   disabled,
    //   // ...attributes
    //   // ??
    //   className,
    //   classNamespace,
    //   children,
    //   type,
    //   form,
    //   durationError,
    //   durationSuccess,
    //   onClick,
    //   onError,
    //   onSuccess,
    //   state,
    //   shouldAllowClickOnLoading,
    //   controlled,
    //   ...containerProps
    // } = this.props;

    // ?
    // const { asyncState } = this.state;
    // const isPending = asyncState === 'pending';
    // const isFulfilled = asyncState === 'fulfilled';
    // const isRejected = asyncState === 'rejected';
    // const isDisabled = disabled || isPending;
    // const btnClasses = cx(className, {
    //   [loadingClass]: isPending,
    //   [fulFilledClass]: isFulfilled,
    //   [rejectedClass]: isRejected,
    // });
    // let buttonText;
    //
    // if (isPending) {
    //   buttonText = pendingText;
    // } else if (isFulfilled) {
    //   buttonText = fulFilledText;
    // } else if (isRejected) {
    //   buttonText = rejectedText;
    // }
    // buttonText = buttonText || text;
    //
    // // ??
    // containerProps.className = `${classNamespace}container${this.state.currentState} ${className}`;
    // containerProps.onClick = this.handleClick;

    const { status } = this.state;
    const {
      children,
      bsStyle,
      styleName,
      pendingText,
      fulFilledText,
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
        stateText = fulFilledText;
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
        {...omit(this.props, ['status', 'promise', 'timeout', 'pendingText', 'fulFilledText', 'rejectedText'])}
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
