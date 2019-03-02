import { Selector } from 'testcafe';
import { checkLiquidErrors, getResultElement, getResultText } from './index';

const url = 'https://examples.staging.oregon.platform-os.com/multilanguage';

fixture('Test helpers').page(url);

test('checkLiquidErrors', async t => {
  await checkLiquidErrors({ t, Selector });
});

test('getResultElement', async t => {
  const resultElement = await getResultElement({ name: 1, Selector });
  const attr = resultElement.getAttribute('data-result');

  await t.expect(attr).eql('1');
});

test('getResultText', async t => {
  const resultText = await getResultText({ name: 1, Selector });

  await t.expect(resultText).contains('Hello world');
});
