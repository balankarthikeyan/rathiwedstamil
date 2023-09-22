import { storiesOf, addParameters } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { themes } from '@storybook/theming'

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS },
  options: {
    theme: themes.light,
  },
})

const createStoryModule = name => {
  const storyGroup = storiesOf(name, module)
  storyGroup.addDecorator(withKnobs).addDecorator(withA11y)
  return storyGroup
}

const globalStories = createStoryModule('global')

export { createStoryModule, globalStories }
