import React from 'react';

import NotificationBox from './NotificationBox';
import NotificationList from './NotificationList';
import Notification from './Notification';

import take from 'lodash/take';

import defaultAvatar from '../Avatar/img/default-avatar.png';

const notifications = [{
  id: 1,
  content: {
    user: {
      id: 9,
      name: 'John Smith',
      avatar: defaultAvatar,
      status: 'online',
    },
    action: 'deal',
    actionType: 'accept',
    object: {
      id: 112,
      title: 'Название сделки',
    },
  },
  viewed: false,
},
{
  id: 2,
  content: {
    action: 'deal',
    actionType: 'timeEnds',
    object: {
      id: 313,
      title: 'Название какой-то сделки',
    },
  },
  viewed: false,
},
{
  id: 3,
  content: {
    action: 'deal',
    object: {
      id: 123,
      title: 'Ваша сделка',
    },
  },
  viewed: false,
},
{
  id: 4,
  content: {
    user: {
      id: 12,
      name: 'Peter Smith',
      avatar: defaultAvatar,
      status: 'offline',
    },
    action: 'message',
  },
  viewed: false,
},
{
  id: 5,
  content: {
    user: {
      id: 22,
      name: 'Amanda Smith',
      avatar: defaultAvatar,
      status: 'online',
    },
    action: 'comment',
  },
  viewed: false,
},
{
  id: 6,
  content: {},
  viewed: false,
},
{
  id: 7,
  content: {},
  viewed: true,
}];
const oneNotification = take(notifications, 1);
const twoNotifications = take(notifications, 2);

module.exports = function ({ storiesOf }) {
  return storiesOf('Notifications', module)
    .add('NotificationBox default', () => (
      <NotificationBox notifications={notifications} />
    ))
    .add('Default list', () => (
      <NotificationList notifications={notifications} />
    ))
    .add('Empty list', () => (
      <NotificationList notifications={[]} />
    ))
    .add('One notification in list', () => (
      <NotificationList notifications={oneNotification} />
    ))
    .add('Two notifications in list', () => (
      <NotificationList notifications={twoNotifications} />
    ))
    .add('Showing three notifications in list', () => (
      <NotificationList showCount={4} notifications={notifications} />
    ))
    .add('Notification content', () => (
      <Notification>{{ id: 8, content: {} }}</Notification>
    ));
};
