module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-typescript',
    'next/babel',
  ],
  plugins: [['styled-components', { ssr: true, displayName: true }]],
};
