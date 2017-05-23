import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import { autobind } from 'core-decorators';

import Avatar from '../Avatar';
import defaultAvatar from '../Avatar/img/default-avatar.png';

@css(require('./Notifications.scss'))
export default class Notification extends Component {

  static defaultProps = {
    children: null,
  }

  static propTypes = {
    // user: PropTypes.shape({
    //   avatar: PropTypes.string.isRequired,
    //   fullName: PropTypes.string.isRequired,
    //   online: PropTypes.bool.isRequired,
    // }),
    // cut: PropTypes.number,
    // action: PropTypes.number.isRequired,
    // content: PropTypes.string.isRequired
    children: PropTypes.any,

    // content: PropTypes.string.isRequired,
  }

  @autobind
  cutLink(message) {
    const result = [];
    if (message) {
      // check for links
      let pos = message.indexOf('<a href=');
      // const re = /\<a href\=[.]+\>/;
      // const found = re.match(message);
      if (pos !== -1) {
        if (pos !== 0) {
          result.start = message.slice(0, pos);
        }
        let tmp = message.slice(pos, message.length).replace('<a href=', '');
        pos = tmp.indexOf('>');
        const link = tmp.slice(0, pos - 1);
        tmp = tmp.slice(pos, tmp.length);
        pos = tmp.indexOf('</a>');
        const end = tmp.slice(pos, tmp.length);
        tmp = tmp.slice(0, pos);
        result.link = `<a href=${link}>${tmp.slice(0, 26)}...</a>`; // cut 26 first symbols
        if (end) {
          result.end = end;
        }
      }
    }
    return result;
  }

  render() {
    // const content = this.props.content;
    //
    // return (
    //   <div styleName="notification">
    //     { content }
    //   </div>
    // );

    // if (this.props.cut === 1) {
    //   const msgArr = this.cutLink(this.props.children);
    const msgArr = this.props.children;
    // }
    // const { action, user, content } = this.props;
    // let contentMsg = content;
    // if (!msgArr || !msgArr.length) return; // nothing to render
    // switch (action) {
    //   // comment
    //   case 1:
    //     contentMsg = `Прокомментировал вашу сделку ${msgArr.link}`;
    //     break;
    //   // agree
    //   case 2:
    //     contentMsg = `Принял вашу сделку ${msgArr.link}`;
    //     break;
    //   // ends
    //   case 3:
    //     contentMsg = `Ваша сделка ${msgArr.link} скоро истекает`;
    //     if (msgArr.end) {
    //       contentMsg += `, ${msgArr.end}`;
    //     }
    //     break;
    //   default:
    //     contentMsg = 'This is don\'t known action';
    // }

    const user = {
      name: 'John Smith',
      avatar: defaultAvatar,
      status: 'online',
    };

    const userStatusColor = user.status === 'online' ? '#80CD41' : '#F44336';

    return (
      <div styleName="notification">
        <div styleName="notification__avatar">
          <Avatar
            title={user.name}
            avatar={user.avatar}
            size={82}
          >
            <Avatar.Badge right bottom>
              <div style={{ width: 18, height: 18, backgroundColor: userStatusColor, borderRadius: '50%', border: '5px solid #FFF' }} />
            </Avatar.Badge>
          </Avatar>
        </div>
        <div styleName="notification__message">
          {/* {this.props.children} */}
          {user && <strong>{user.name}</strong>}{' '}
          {msgArr}
        </div>
      </div>
    );
  }
}
