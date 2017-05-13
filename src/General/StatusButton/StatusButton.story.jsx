import React from 'react';
import StatusButton from './StatusButton';

module.exports = function ({ storiesOf }) {
  return storiesOf('StatusButton', module)
    .add('Default button', () => (
      <StatusButton />
    ))
    .add('State: loading', () => (
      <StatusButton state="loading" />
    ))
    .add('State: success', () => (
      <StatusButton state="success" />
    ))
    .add('State: error', () => (
      <StatusButton state="error" />
    ))
    .add('Propmise: success', () => (
      <StatusButton state="success" />
    ))
    .add('Promise: error', () => (
      <StatusButton state="error" />
    ));
};
