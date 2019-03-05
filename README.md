## Why?

This package exists to DRY up tests when they are scattered across multiple directories.

For example, if platformOS project is made of many modules and modules have to be tested individually, but also project has to be tested as a whole.

You can see example source code: [examples](https://github.com/mdyd-dev/marketplace-nearme-example)

## How?

All functions are pure functions and are made with dependency injection in mind.

Provide the input (module itself does not include TestCafe as dependency) and you will get the output. All methods are async, so do not forget about `await`ing for values.

## Installation and usage

### Install package

    npm i -D @platform-os/testcafe-helpers

### Import what you need

```js
import {
  checkLiquidErrors,
  getResultElement, 
  getResultText
} from '@platform-os/testcafe-helpers';
```

## Methods

### checkLiquidErrors

Checks html body content liquid errors.

#### Example 

```js
test('checkLiquidErrors', async t => {
  await checkLiquidErrors({ t, Selector });
});
```

### getResultElement

Gets TestCafe element marked using `data-result` data attribute in html.

#### Example

For HTML: `<p data-result="money_total">50</p>`

```js
test('getResultElement', async t => {
  const resultElement = await getResultElement({ name: 'money_total', Selector });
  const attr = resultElement.getAttribute('data-result');

  await t.expect(attr).eql('money_total');
});
```

### getResultText

Returns `textContent` of an element marked using `data-result` data attribute in html.

#### Example

For HTML: `<p data-result="money_total">50</p>`

```js
test('getResultText', async t => {
  const resultText = await getResultText({ name: 'money_total', Selector });

  await t.expect(resultText).eql('50');
});
```

### getBtAlertElement

Gets TestCafe element marked using default Twitter Bootstrap alert css class. Type defaults to `success`.

#### Example

For HTML: `<div class="alert alert-danger">You do not have permission to do that.</div>`

```js
test('getBtAlertElement', async t => {
  const dangerElement = await getBtAlertElement({ type: 'danger', Selector });
  const dangerText = await dangerElement.innerText;
  
  const noTypeElement = await getBtAlertElement({ Selector });
  const noTypeText = await noTypeElement.innerText;

  await t.expect(dangerText).contains('You do not have permission to do that.');
  await t.expect(noTypeText).contains('Flash notice');
});
```

### getBtAlertText

Returns `textContent` of an alert marked using default Twitter Bootstrap alert css class. Type defaults to `success`.

#### Example

For HTML: `<div class="alert alert-warning">You do not have permission to do that.</p>`

```js
test('getBtAlertText', async t => {
  const danger = await getBtAlertText({ type: 'danger', Selector });
  const noType = await getBtAlertText({ Selector });
  
  await t.expect(danger).contains('Flash error');
  await t.expect(noType).contains('Flash notice');
});
```

## Contributions

[Issues are open](https://github.com/mdyd-dev/platformos-testcafe-helpers/issues)