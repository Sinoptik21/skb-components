import React from 'react';
import StatusButton from './StatusButton';
import TestPromise from './test/TestPromise';

module.exports = function ({ storiesOf, action, knob }) {
  // let resolve;
  // const promise = new Promise((_resolve) => { resolve = _resolve; });
  // const onClick = () => promise;

  // const handleClick1 = () => {
  //   return new Promise((resolve) => {
  //     // make asynchronous call
  //     setTimeout(resolve, 3000);
  //   });
  // };
  //
  // const handleClick2 = () => {
  //   return new Promise((resolve, reject) => {
  //     // make asynchronous call
  //     setTimeout(reject, 3000);
  //   });
  // };

  return storiesOf('StatusButton', module)
    .addHtml(<link rel="stylesheet" type="text/css" href="https://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />)
    .add('Knobs', () => (
      <StatusButton
        onClick={action('onClick')}
        status={knob.select('Status', {
          '': '',
          loading: 'loading',
          success: 'success',
          error: 'error',
          disabled: 'disabled',
        }, '')}
        pendingText={knob.text('Pending text', '')}
        fulfilledText={knob.text('FulFilled text', '')}
        rejectedText={knob.text('Rejected text', '')}
      >
        {knob.text('children', 'Sample content')}
      </StatusButton>
    ))
    .add('Knobs (Bootstrap styles)', () => (
      <StatusButton
        onClick={action('onClick')}
        bsStyle={knob.select('bsStyle', {
          default: 'default',
          info: 'info',
          primary: 'primary',
          link: 'link',
          success: 'success',
          warning: 'warning',
          danger: 'danger',
        }, 'default')}
        bsSize={knob.select('bsSize', {
          xs: 'xsmall',
          sm: 'small',
          lg: 'large',
        }, 'small')}
        status={knob.select('Status', {
          '': '',
          loading: 'loading',
          success: 'success',
          error: 'error',
          disabled: 'disabled',
        }, '')}
        pendingText={knob.text('Pending text', '')}
        fulfilledText={knob.text('Fulfilled text', '')}
        rejectedText={knob.text('Rejected text', '')}
      >
        {knob.text('children', 'Button')}
      </StatusButton>
    ))
    .add('Default button', () => (
      <StatusButton onClick={action('onClick')}>Button</StatusButton>
    ))
    .add('State: loading', () => (
      <StatusButton onClick={action('onClick')} status="loading">Button</StatusButton>
    ))
    .add('State: loading (with text)', () => (
      <StatusButton onClick={action('onClick')} status="loading" pendingText="Загрузка...">Button</StatusButton>
    ))
    .add('State: success', () => (
      <StatusButton onClick={action('onClick')} status="success">Button</StatusButton>
    ))
    .add('State: success (with text)', () => (
      <StatusButton onClick={action('onClick')} status="success" fulfilledText="Готово">Button</StatusButton>
    ))
    .add('State: error', () => (
      <StatusButton onClick={action('onClick')} status="error">Button</StatusButton>
    ))
    .add('State: error (with text)', () => (
      <StatusButton onClick={action('onClick')} status="error" rejectedText="Ошибка">Button</StatusButton>
    ))
    .add('State: disabled', () => (
      <StatusButton onClick={action('onClick')} status="disabled">Button</StatusButton>
    ))
    .add('Promise: success', () => (
      <TestPromise
        promiseTimeout={knob.number('promiseTimeout', 1000)}
        timeout={knob.number('timeout', 2000)}
      >
        Отправить
      </TestPromise>
    ))
    .add('Promise: error', () => (
      <TestPromise
        error
        promiseTimeout={knob.number('promiseTimeout', 1000)}
        timeout={knob.number('timeout', 2000)}
      >
        Отправить
      </TestPromise>
    ));
};
