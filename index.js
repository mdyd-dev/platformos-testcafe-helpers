import { Selector } from 'testcafe';

const checkLiquidErrors = async t => {
  const bodyText = await Selector('Body').textContent;

  return t
    .expect(bodyText)
    .notContains('Liquid Error')
    .expect(bodyText)
    .notContains('RenderFormTag Error:')
    .expect(bodyText)
    .notContains('QueryGraphTag Error:')
    .expect(bodyText)
    .notContains('ExecuteQueryTagError:');
};

const getResultElement = async name => await Selector(`[data-result="${name}"]`);

const getResultText = async name => await Selector(`[data-result="${name}"]`).textContent;

export { checkLiquidErrors, getResultElement, getResultText };
