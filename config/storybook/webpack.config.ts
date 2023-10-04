// @ts-nocheck
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import { BuildPath } from '../build/types/config';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPath = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };

  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules = [
    ...config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    }),
    buildSvgLoader(),
  ];

  config.plugins.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  );

  config.module.rules.push(buildCssLoader(true));

  return config;
};
