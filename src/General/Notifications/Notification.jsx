import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import A from '../A';
import Avatar from '../Avatar';

const ONLINE_BADGE_COLOR = '#80CD41';
const OFFLINE_BADGE_COLOR = '#F44336';

@css(require('./Notifications.scss'))
export default class Notification extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  @autobind
  handleClickToLink(e) {
    e.preventDefault();
    console.log('Поздравляю, вы перешли по ссылке');
  }

  switchActions(notify) {
    let avatar = null;
    if (notify.user) {
      const userStatusColor = notify.user.status === 'online' ? ONLINE_BADGE_COLOR : OFFLINE_BADGE_COLOR;
      const avatarSrc = notify.user.avatar || null;
      avatar = (
        <div styleName="notification__avatar">
          <Avatar
            title={notify.user.name}
            avatar={avatarSrc}
            size={82}
          >
            <Avatar.Badge right bottom>
              <div style={{ width: 18, height: 18, backgroundColor: userStatusColor, borderRadius: '50%', border: '5px solid #FFF' }} />
            </Avatar.Badge>
          </Avatar>
        </div>
      );
    }

    switch (notify.action) {
      case 'deal': return this.renderDeal(notify, avatar);
      case 'message': return this.renderMessage(notify, avatar);
      case 'comment': return this.renderComment(notify, avatar);
      default: return this.renderDefault();
    }
  }
  renderDeal(notify, avatar) {
    switch (notify.actionType) {
      case 'accept': {
        return (
          <div styleName="notification">
            {avatar}
            <div styleName="notification__message">
              <A onClick={this.handleClickToLink} href={`/cabinet/user/${notify.user.id}`}>{<strong>{notify.user.name}</strong>}</A>
              {' принял вашу сделку '}
              <A onClick={this.handleClickToLink} href={`/cabinet/offers/${notify.object.id}`}>{_.get(notify, 'object.title')}</A>
            </div>
          </div>
        );
      }
      case 'timeEnds':
        return (
          <div styleName="notification">
            <div styleName="notification__message">
              {'Ваша сделка '}
              <A onClick={this.handleClickToLink} href={`/cabinet/offers/${notify.object.id}`}>{_.get(notify, 'object.title')}</A>
              {' скоро истекает.'}
            </div>
          </div>
        );
      default:
        return (
          <div styleName="notification">
            <div styleName="notification__message">
              {'Уведомление, связанное с вашей сделкой '}
              <A onClick={this.handleClickToLink} href={`/cabinet/offers/${notify.object.id}`}>{_.get(notify, 'object.title')}</A>
            </div>
          </div>
        );
    }
  }
  renderMessage(notify, avatar) {
    return (
      <div styleName="notification">
        {avatar}
        <div styleName="notification__message">
          <A onClick={this.handleClickToLink} href={`/cabinet/user/${notify.user.id}`}>{<strong>{notify.user.name}</strong>}</A>
          {' отправил вам сообщение'}
        </div>
      </div>
    );
  }
  renderComment(notify, avatar) {
    return (
      <div styleName="notification">
        {avatar}
        <div styleName="notification__message">
          <A onClick={this.handleClickToLink} href={`/cabinet/user/${notify.user.id}`}>{<strong>{notify.user.name}</strong>}</A>
          {' оставил комментарий'}
        </div>
      </div>
    );
  }
  renderDefault() {
    return (
      <div styleName="notification">
        <div styleName="notification__message">
          <strong>У вас какое-то уведомление</strong>
        </div>
      </div>
    );
  }

  render() {
    // TODO: добавить viewed
    const notify = this.props.children;
    return this.switchActions(notify);
  }
}
