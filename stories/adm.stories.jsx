import * as React from 'react'
import { createStoryModule } from './base.stories'
import * as Adm from '@adm'
import * as IconsGallery from '@iconsGallery'
const admStories = createStoryModule('adm')
function useActiveState(props) {
  const { defaultActive = false } = props
  const [isActive, setActive] = React.useState(defaultActive)
  const handleClick = () => {
    setActive(!isActive)
  }

  return {
    isActive,
    setActive,
    handleClick,
  }
}

function Button(props) {
  const { isActive, handleClick } = useActiveState({ defaultActive: false })
  const { name = 'Button' } = props || {}

  const buttonContent = `${isActive ? `😉 ${name}` : `😎 ${name}`}`
  const buttonAttrs = {
    variant: 'contained',
    onClick: handleClick,
    color: 'primary',
    isActive,
  }

  return <Adm.Button {...buttonAttrs}>{buttonContent}</Adm.Button>
}

admStories.add('Button', () => {
  return <Button />
})

admStories.add('ToggleButton', () => {
  console.log('Adm', Adm)
  return <Adm.ToggleButton />
})

admStories.add('DropdownKit', () => {
  const customOnUpdate = props => {
    console.log('Dropdown Value!!!!', props)
  }

  const iconArrs = {
    list: ['Setting', 'Check', 'Group'],
    defaultValue: 'Check',
    icons: [
      IconsGallery.SettingsIcon,
      IconsGallery.CheckIcon,
      IconsGallery.GroupAddIcon,
    ],
    onUpdate: customOnUpdate,
  }
  return (
    <>
      <Adm.DropdownKit onUpdate={customOnUpdate} />
      <br />
      <br />
      <Adm.DropdownKit
        defaultValue="Check"
        list={['Setting', 'Check', 'Group']}
        onUpdate={customOnUpdate}
      />
      <br />
      <br />
      <Adm.DropdownKit
        defaultValue=""
        placeholder="Select"
        list={['Setting', 'Check', 'Group']}
        onUpdate={customOnUpdate}
      />
      <br />
      <br />
      <>------------------</>
      <br />
      <br />
      <Adm.DropdownKit {...iconArrs} />
    </>
  )
})

admStories.add('DropdownMenu', () => {
  return <Adm.DropdownMenu />
})

admStories.add('Modal', () => {
  return <Adm.Modal />
})

admStories.add('Quanity', () => {
  const attr = {
    minLimt: 5,
    onUpdate: props => {
      console.log(props)
    },
  }
  return <Adm.Quantity {...attr} />
})
admStories.add('TabTextField', () => {
  const attr = {
    onUpdate: props => {
      console.log(props)
    },
  }
  return <Adm.TabTextField {...attr} />
})
admStories.add('TabDropdown', () => {
  const attr = {
    onUpdate: props => {
      console.log(props)
    },
  }
  return <Adm.TabDropdown {...attr} />
})

admStories.add('TextFieldDropdown', () => {
  const attr = {
    onUpdate: props => {
      console.log(props)
    },
  }
  return <Adm.TextFieldDropdown {...attr} />
})

admStories.add('Calender', () => {
  const customOnUpdateCalender = props => {
    console.log(props)
  }
  return <Adm.Calender onUpdateCalender={customOnUpdateCalender} />
})
admStories.add('CustomLogo', () => {
  return <Adm.CustomLogo />
})
admStories.add('Tab', () => {
  return (
    <Adm.Tab
      onUpdate={props => {
        console.log(props)
      }}
    />
  )
})
admStories.add('RadioButtonList', () => {
  return (
    <Adm.RadioButtonList
      onUpdate={props => {
        console.log(props)
      }}
    />
  )
})
admStories.add('AccordianPanel', () => {
  return (
    <Adm.AccordianPanel
      onUpdate={props => {
        console.log(props)
      }}
    />
  )
})

admStories.add('Abstract', () => {
  return <Adm.Abstract />
})
