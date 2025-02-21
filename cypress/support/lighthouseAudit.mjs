import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { CONFIG, LIGHTHOUSEAUDIT } from '../config/configSpec.js';

const { url } = CONFIG(), { logLevel, output, onlyCategories, throttlingMethod, emulatedFormFactor, disableStorageReset } = LIGHTHOUSEAUDIT();

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: logLevel,
    output: output,
    onlyCategories: onlyCategories,
    throttlingMethod: throttlingMethod,
    emulatedFormFactor: emulatedFormFactor,
    disableStorageReset: disableStorageReset,
    port: chrome.port,
    outputPath: 'lighthouse-report.json'
  };

  const runnerResult = await lighthouse(url, options);

  console.log(`Performance score: ${runnerResult.lhr.categories.performance.score * 100}`);
  console.log(`Acessibilidade: ${runnerResult.lhr.categories.accessibility.score * 100}`);
  console.log(`Boas práticas: ${runnerResult.lhr.categories["best-practices"].score * 100}`);
  console.log(`SEO: ${runnerResult.lhr.categories.seo.score * 100}`);
  if (runnerResult.lhr.categories.pwa) {
    console.log(`PWA: ${runnerResult.lhr.categories.pwa.score * 100}`);
  }
  
  await chrome.kill();
})();