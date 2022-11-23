/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
  ],
  plugins: [
    // eslint-disable-next-line global-require
    require('flowbite/plugin'),
  ],
  theme: {},
};
