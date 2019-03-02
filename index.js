const checkLiquidErrors = async ({ t, Selector }) => {
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

const getResultElement = async ({ name, Selector }) => await Selector(`[data-result="${name}"]`);

const getResultText = async ({ name, Selector }) => await Selector(`[data-result="${name}"]`).textContent;

export { checkLiquidErrors, getResultElement, getResultText };
