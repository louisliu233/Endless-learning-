import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置代理
  // proxy: {
  //   '/api': {
  //     'target': 'http://public-api-v1.aspirantzhang.com',
  //     'changeOrigin': true,
  //     'pathRewrite': { '^/api' : '' },
  //   },
  // },
});
