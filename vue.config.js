const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');

    types.forEach((type) =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    );
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/styles/index.scss')],
    });
}
