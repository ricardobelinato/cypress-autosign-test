import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { CONFIG, LIGHTHOUSEAUDIT } from '../../config/configSpec.js';

const { url } = CONFIG();
const auditConfig = LIGHTHOUSEAUDIT();

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options: Parameters<typeof lighthouse>[1] = {
    ...auditConfig,
    port: chrome.port,
    outputPath: 'lighthouse-report.json'
  };

  try {
    const runnerResult = await lighthouse(url, options);

    if (!runnerResult?.lhr?.categories) {
      throw new Error('Resultado do Lighthouse inválido.');
    }

    const categories = runnerResult.lhr.categories;

    console.log(`🔍 Lighthouse report for: ${url}`);
    console.log(`📊 Performance: ${scoreToPercent(categories.performance?.score)}`);
    console.log(`♿ Acessibilidade: ${scoreToPercent(categories.accessibility?.score)}`);
    console.log(`✅ Boas práticas: ${scoreToPercent(categories["best-practices"]?.score)}`);
    console.log(`🔎 SEO: ${scoreToPercent(categories.seo?.score)}`);
    if (categories.pwa) {
      console.log(`📱 PWA: ${scoreToPercent(categories.pwa.score)}`);
    }
  } catch (err) {
    console.error('Erro durante auditoria:', err);
  } finally {
    await chrome.kill();
  }
})();

function scoreToPercent(score?: number): string {
  return typeof score === 'number' ? `${Math.round(score * 100)}` : 'N/A';
}
