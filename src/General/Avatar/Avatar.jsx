import React from 'react';
import PropTypes from 'prop-types';
// import importcss from 'importcss';
// import classNames from 'classnames';
import Component from 'lsk-general/General/Component';
import _ from 'lodash';

// @importcss(require('./Avatar.css'))
export default class Avatar extends Component {

  static defaultProps = {
    src: '',
    size: 64,
    bgColor: '#9F9',
    shape: 'circle',
    textColor: '#FFF',
    textSizeRatio: 3,
    border: false,
    borderColor: '#00BCD4',
    borderWidth: 3,
    shadow: false,
    inactive: false,
    badgeContent: '',
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
    size: PropTypes.number,
    bgColor: PropTypes.string,
    shape: PropTypes.oneOfType(['circle', 'square', 'rounded']),
    textColor: PropTypes.string,
    textSizeRatio: PropTypes.number,
    border: PropTypes.bool,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    shadow: React.PropTypes.bool,
    inactive: PropTypes.bool,
    badgeContent: PropTypes.any,
  };

  renderAsImage() {
    const {
      name,
      src,
      size,
      shape,
      border,
      borderColor,
      borderWidth,
      shadow,
      inactive,
    } = this.props;

    const imageStyle = {
      width: size,
      maxWidth: '100%',
      height: size,
      border: border ? `${borderWidth}px solid ${borderColor}` : 'none',
      padding: border ? '2px' : 'none',
      borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? 6 : 0,
      filter: inactive ? 'grayscale(100%)' : 'none',
      boxShadow: shadow ? '1px 1px 10px 2px #ccc' : 'none',
    };

    return (
      <img
        width={size}
        height={size}
        style={imageStyle}
        src={src}
        alt={name}
        title={name}
      />
    );
  }

  renderAsText() {
    const {
      name,
      size,
      bgColor,
      shape,
      textColor,
      textSizeRatio,
      border,
      borderColor,
      borderWidth,
      shadow,
      inactive,
    } = this.props;

    const initials = name
      .split(' ')
      .map(s => s.charAt(0))
      .join('');

    const initialsStyle = {
      width: size,
      maxWidth: '100%',
      height: size,
      font: `${Math.floor(size / textSizeRatio)}px Helvetica, Arial, sans-serif`,
      textAlign: 'center',
      textTransform: 'uppercase',
      lineHeight: `${size}px`,
      color: textColor,
      background: inactive ? 'grey' : bgColor,
      border: border ? `${borderWidth}px solid ${borderColor}` : 'none',
      padding: border ? '2px' : 'none',
      borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? 6 : 0,
      boxShadow: shadow ? '2px 3px 8px 1px #ccc' : 'none',
    };

    return (
      <div style={initialsStyle} alt={name} title={name}>
        {initials}
      </div>
    );
  }

  render() {
    const {
      src,
      size,
      badgeContent,
    } = this.props;

    const hostStyle = {
      display: 'inline-block',
      width: size,
      height: size,
      position: 'relative',
    };

    const Badge = badgeContent ? (<div>{ badgeContent }</div>) : null;

    return (
      <div style={hostStyle}>
        {src ? this.renderAsImage() : this.renderAsText()}
        { Badge }
      </div>
    );
  }
}
