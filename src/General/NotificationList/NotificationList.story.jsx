import React from 'react';
import NotificationList from './NotificationList';
import take from 'lodash/take';

const notifications = [{
  id: 1,
  content: (<div>notification1</div>),
},
{
  id: 2,
  content: (<div>notification2</div>),
},
{
  id: 3,
  content: (<div>notification3</div>),
},
{
  id: 4,
  content: (<div>notification4</div>),
},
{
  id: 5,
  content: (<div>notification5</div>),
}];
const oneNotification = take(notifications, 1);
const twoNotifications = take(notifications, 2);

module.exports = function ({ storiesOf }) {
  return storiesOf('NotificationList', module)
    .add('Default list', () => (
      <NotificationList notifications={notifications} />
    ))
    .add('Empty list', () => (
      <NotificationList notifications={[]} />
    ))
    .add('One notification', () => (
      <NotificationList notifications={oneNotification} />
    ))
    .add('Two notifications', () => (
      <NotificationList notifications={twoNotifications} />
    ))
    .add('Showing three notifications', () => (
      <NotificationList showCount={3} notifications={notifications} />
    ));
};
