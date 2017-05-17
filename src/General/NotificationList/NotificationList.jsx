import React from 'react';
import PropTypes from 'prop-types';
import Component from 'lsk-general/General/Component';
// import cx from 'classnames';
// import css from 'importcss';
import { autobind } from 'core-decorators';
import take from 'lodash/take';
import plural from './plural.js';

export default class NotificationList extends Component {

  static defaultProps = {
    showCount: 4,
  }

  static propTypes = {
    showCount: PropTypes.number,
    notifications: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  // componentDidMount() {
  //   this.loadNotificationsFromServer();
  //   // setInterval(this.loadNotificationsFromServer, this.props.pollInterval);
  // }

  // @autobind
  // loadCommentsFromServer() {
  //   // TODO: получить события
  //   this.setState({ notifications });
  // }

  @autobind
  handleNotificationsShow(e) {
    e.preventDefault();
    const notifications = this.props.notifications;
    // console.log(notifications);
    this.setState({ showAll: true });
  }

  render() {
    const {
      showCount,
      notifications,
    } = this.props;

    const showAll = this.state.showAll;

    const visibleNotifications = showAll ? notifications : take(notifications, showCount);

    const notificationNodes = visibleNotifications.map(notification =>
      (
        // <Notification>
        //   {notification.content}
        // </Notification>
        <div key={notification.id}>{notification.content}</div>
      ),
    );

    const eventCount = notifications.length;
    const eventCountTxt = eventCount === 0 ? 'Нет событий' : `${eventCount} ${plural(eventCount, 'событие', 'события', 'событий')}`;
    const notificationList = eventCount === 0 ? '' : (<div className="notification__list__content">{notificationNodes}</div>);
    const footer = eventCount > showCount && !showAll ? (<div className="notification__list__footer"><a href="#" onClick={this.handleNotificationsShow}>Все сообщения</a></div>) : '';

    return (
      <div className="notification__list">
        <div className="notification__list__header">{eventCountTxt}</div>
        {notificationList}
        {footer}
      </div>
    );
  }
}
