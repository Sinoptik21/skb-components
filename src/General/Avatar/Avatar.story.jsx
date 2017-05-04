import React from 'react';
import Avatar from './Avatar';
import _ from 'lodash';

const rndNum = _.random(99);
const avatarImg = `https://randomuser.me/api/portraits/men/${rndNum}.jpg`;

module.exports = function ({ storiesOf, action }) {
  return storiesOf('Avatar', module)
    .add('default', () => (
      <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" /></div>
    ))
    .add('no avatar', () => (
      <div style={{ float: 'left', padding: '10px' }}><Avatar name="John Smith" /></div>
    ))
    .add('sizes', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" size={32} /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" size={64} /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" size={100} /></div>
      </div>
    ))
    .add('border', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" border /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" border borderWidth={2} borderColor="#4CAF50" /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" border borderWidth={4} borderColor="#F44336" /></div>
      </div>
    ))
    .add('badges', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" badgeContent={<div style={{ width: 10, height: 10, backgroundColor: '#4CAF50', borderRadius: '50%', position: 'absolute', right: '0px', bottom: '0px', border: '2px solid #fff' }} />} /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar name="Offline" badgeContent={<div style={{ width: 10, height: 10, backgroundColor: '#F44336', borderRadius: '50%', position: 'absolute', right: '0px', bottom: '0px', border: '2px solid #fff' }} />} /></div>
      </div>
    ))
    .add('inactive', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" inactive /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar name="John Smith" inactive /></div>
      </div>
    ))
    .add('shadow', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" shadow /></div>
      </div>
    ))
    .add('shapes', () => (
      <div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" shape="circle" /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" shape="square" /></div>
        <div style={{ float: 'left', padding: '10px' }}><Avatar src={avatarImg} name="John Smith" shape="rounded" /></div>
      </div>
    ));
};
