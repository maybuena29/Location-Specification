const fastRefreshCracoPlugin = require('craco-fast-refresh');

module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          { plugin: fastRefreshCracoPlugin }
        ],
      },
    },
};