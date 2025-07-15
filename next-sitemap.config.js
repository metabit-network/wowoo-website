/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://wowoonet.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  // If you use i18n routing in next.config.js, add:
  // i18n: {
  //   locales: ['en', 'ko', 'zh', 'ja'],
  //   defaultLocale: 'en',
  // },
};
