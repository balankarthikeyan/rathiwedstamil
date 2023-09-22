/**
 * automatically import all files ending in *.stories.tsx
 */
const alias = require('../alias')
const req = require.context('../stories', true, /\.stories\.jsx$/)
import { configure, addParameters } from '@storybook/react'
import { create } from '@storybook/theming'

// coral / ocean highlights
// const theme = create({
//   base: "dark",
//   colorPrimary: "#FF4785",
//   colorSecondary: "#1EA7FD",
//   brandImage: "https://place-hold.it/350x150",
// })

const loadStories = () => req.keys().forEach(req)
configure(loadStories, module)
// addParameters({ options: { theme } })
