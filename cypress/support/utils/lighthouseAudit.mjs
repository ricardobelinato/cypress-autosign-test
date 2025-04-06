import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const url = 'https://seusite.com'; // ou importa de algum JSON/arquivo separado
const auditConfig = {
  logLevel: 'info',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
};

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

const options = {
  port: chrome.port,
  ...auditConfig,
};

try {
  const result = await lighthouse(url, options);
  const categories = result.lhr.categories;

  const scoreToPercent = (score) =>
    typeof score === 'number' ? `${Math.round(score * 100)}` : 'N/A';

  console.log(`🔍 Audit for: ${url}`);
  console.log(`Performance: ${scoreToPercent(categories.performance?.score)}`);
  console.log(`Acessibilidade: ${scoreToPercent(categories.accessibility?.score)}`);
  console.log(`Boas práticas: ${scoreToPercent(categories['best-practices']?.score)}`);
  console.log(`SEO: ${scoreToPercent(categories.seo?.score)}`);
} catch (err) {
  console.error('Erro na auditoria:', err);
} finally {
  await chrome.kill();
}
