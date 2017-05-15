import React from 'react';
import StatusButton from './StatusButton';
import TestPromise from './test/TestPromise';

module.exports = function ({ storiesOf, action, knob }) {
  // let resolve;
  // const promise = new Promise((_resolve) => { resolve = _resolve; });
  // const onClick = () => promise;

  const handleClick1 = () => {
    return new Promise((resolve) => {
      // make asynchronous call
      setTimeout(resolve, 3000);
    });
  };

  const handleClick2 = () => {
    return new Promise((resolve, reject) => {
      // make asynchronous call
      setTimeout(reject, 3000);
    });
  };

  return storiesOf('StatusButton', module)
    .addHtml(<link rel="stylesheet" type="text/css" href="https://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />)
    .add('Default button', () => (
      <StatusButton />
    ))
    .add('Status: loading', () => (
      <StatusButton status="loading" bsStyle="info" />
    ))
    .add('Status: success', () => (
      <StatusButton status="success" bsStyle="success" />
    ))
    .add('Status: error', () => (
      <StatusButton status="error" bsStyle="danger" />
    ))
    .add('Propmise: success', () => (
      <StatusButton status="success" />
    ))
    .add('Promise: error', () => (
      <StatusButton status="error" />
    ))
    .add('Disabled button', () => (
      <StatusButton disabled text="Save" />
    ))
    .add('2', () => (
      <StatusButton text="Save" pendingText="Saving..." />
    ))
    .add('3', () => (
      <StatusButton onClick={onClick} />
    ))
    .add('4', () => (
      <StatusButton className="btn"
        text="Save"
        pendingText="Saving..."
        fulFilledText="Saved Successfully!"
        rejectedText="Failed! Try Again"
        loadingClass="isSaving"
        fulFilledClass="btn-primary"
        rejectedClass="btn-danger"
      />
    ))
    .add('5', () => (
      <StatusButton state="none" onClick={handleClick1()}>Button</StatusButton>
    ))
    .add('6', () => (
      <StatusButton state="none" onClick={handleClick2()}>Button</StatusButton>
    ))
    .add('--API', () => (
      <StatusButton
        onClick={action('onClick')}
        bsStyle="info"
        status={knob.text('status=null|loading|success|error', null)}
        children={knob.text('children', 'Sample content')}
      />
    ))
    .add('Default', () => (
      <StatusButton onClick={action('onClick')}>Status Button</StatusButton>
    ))
    .add('Loading', () => (
      <StatusButton onClick={action('onClick')} status="loading">Click me!</StatusButton>
    ))
    .add('Success', () => (
      <StatusButton onClick={action('onClick')} status="success">Click me!</StatusButton>
    ))
    .add('Error', () => (
      <StatusButton onClick={action('onClick')} status="error">Click me!</StatusButton>
    ))
    .add('Promise success', () => (
      <TestPromise
        promiseTimeout={knob.number('promiseTimeout', 1000)}
        timeout={knob.number('timeout', 2000)}
      >
        Click me!
      </TestPromise>
    ))
    .add('Promise error', () => (
      <TestPromise
        error
        promiseTimeout={knob.number('promiseTimeout', 1000)}
        timeout={knob.number('timeout', 2000)}
      >
        Click me!
      </TestPromise>
    ))
    .add('Bootstrap styles', () => (
      <StatusButton
        onClick={action('onClick')}
        bsStyle={knob.text('bsStyle', 'info')}
        bsSize={knob.text('bsSize', 'large')}
      >
        {knob.text('children', 'Bootstrap styled button')}
      </StatusButton>
    ))
    .add('Change tag=button', () => (
      <StatusButton tag={knob.text('tag', 'button')} status="error">Click me!</StatusButton>
    ))
    .add('Random behaviour', () => {
      return (<StatusButton bsSize="large" promise2={1}>
        Рандомно ведущая себя кнопка
      </StatusButton>);
    });
};
