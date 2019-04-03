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

const getBtAlertElement = async ({ type = 'success', Selector }) => await Selector(`.alert.alert-${type}`);

const getBtAlertText = async ({ type = 'success', Selector }) => await Selector(`.alert.alert-${type}`).textContent;

const getPerformanceMetrics = async ({ t }) => {
  const getLoadTime = async t => JSON.parse(await t.eval(() => JSON.stringify(window.performance.timing)));
  const p = await getLoadTime(t);
  const timeToMS = time => parseInt(time / 10, 10);

  // Learn more what those marks mean: https://www.html5rocks.com/en/tutorials/webperformance/basics/
  const raw = {
    navigationStart: p.navigationStart,
    unloadEventStart: p.unloadEventStart,
    unloadEventEnd: p.unloadEventEnd,
    redirectStart: p.redirectStart,
    redirectEnd: p.redirectEnd,
    fetchStart: p.fetchStart,
    domainLookupStart: p.domainLookupStart,
    domainLookupEnd: p.domainLookupEnd,
    connectStart: p.connectStart,
    connectEnd: p.connectEnd,
    secureConnectionStart: p.secureConnectionStart,
    requestStart: p.requestStart,
    responseStart: p.responseStart,
    responseEnd: p.responseEnd,
    domLoading: p.domLoading,
    domInteractive: p.domInteractive,
    domContentLoadedEventStart: p.domContentLoadedEventStart,
    domContentLoadedEventEnd: p.domContentLoadedEventEnd,
    domComplete: p.domComplete,
    loadEventStart: p.loadEventStart,
    loadEventEnd: p.loadEventEnd
  };

  const computed = {
    ttfb: timeToMS(raw.responseEnd - raw.navigationStart),
    dns: timeToMS(raw.domainLookupEnd - raw.domainLookupStart),
    tcp: timeToMS(raw.connectEnd - raw.connectStart),
    domReady: timeToMS(raw.domComplete - raw.navigationStart),
    networkLatency: timeToMS(raw.responseEnd - raw.fetchStart),
    processing: timeToMS(raw.loadEventEnd - raw.responseEnd),
    everything: timeToMS(raw.loadEventEnd - raw.navigationStart)
  };

  return { raw, computed };
};

module.exports = {
  checkLiquidErrors,
  getResultElement,
  getResultText,
  getBtAlertElement,
  getBtAlertText,
  getPerformanceMetrics
};
