const path = require('path');
const {serializePageThemes} = require('./bootstrap');

// Docusaurus theme plugin. Options: { pageThemes: [{pattern: RegExp, decor, style?, variables?}] }
module.exports = function wikiXenoTheme(context, options) {
  return {
    name: 'wiki-xenotheme',
    getThemePath: () => path.resolve(__dirname, 'src/theme'),
    getClientModules: () => [path.resolve(__dirname, 'src/css/custom.css')],
    async contentLoaded({actions}) {
      actions.setGlobalData({
        pageThemes: serializePageThemes(options.pageThemes),
      });
    },
  };
};
