import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: [
    tailwind(),
    autoprefixer(),
    postcssPresetEnv({
      stage: 1,
      features: {
        'custom-media-queries': true,
      },
    }),
  ],
}
