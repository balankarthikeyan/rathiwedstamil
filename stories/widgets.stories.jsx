import * as React from 'react'
import { createStoryModule } from './base.stories'
import * as Widgets from '@widgets'

const widgets = createStoryModule('widgets')

widgets.add('SelectRange', () => {
  return <Widgets.SelectRange />
})
widgets.add('IncludeExcude', () => {
  return (
    <Widgets.IncludeExclude
      onUpdate={({ value }) => {
        console.log(value)
      }}
    />
  )
})
