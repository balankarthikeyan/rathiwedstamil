import * as React from "react"

// eslint-disable-next-line
function useMediaQuery() {
  const deviceDimension = {
    desktop: 1920,
    tablet: 1080,
    tabletPortrait: 901,
    mobile: 900,
  }
  const deviceStatusList = {
    isDesktopHD: false,
    isDesktop: false,
    isTablet: false,
    isMobile: false,
  }
  const defaultOrientation = {
    isPortrait: false,
    isLandscape: false,
  }

  const [deviceStatus, setDeviceStatus] = React.useState(deviceStatusList)
  const [displaySize, setDisplaySize] = React.useState({ width: 0, height: 0 })
  const [orientationStatus, setOrientationStatus] = React.useState(
    defaultOrientation
  )

  const onUpdateOrientation = () => {
    const { matchMedia = () => "" } = window || {}
    if (matchMedia("(orientation: landscape)").matches) {
      setOrientationStatus({ isLandscape: true, isPortrait: false })
    }
    if (matchMedia("(orientation: portrait)").matches) {
      setOrientationStatus({ isPortrait: true, isLandscape: false })
    }
  }
  const onUpdateResize = () => {
    const { innerWidth = 0, innerHeight = 0 } = window || {}
    const sizeData = { width: innerWidth, height: innerHeight }
    setDisplaySize(sizeData)
    onUpdateDeviceStatus(sizeData)
    onUpdateOrientation()
  }

  const onUpdateDeviceStatus = (props) => {
    const { width } = props
    const { desktop, mobile, tablet, tabletPortrait } = deviceDimension
    let updateDeviceStatus = {}

    if (desktop + 1 < window.innerWidth) {
      updateDeviceStatus = { ...deviceStatus, isDesktopHD: true }
    } else if (tablet < width && desktop > width) {
      updateDeviceStatus = { ...deviceStatus, isDesktop: true }
    } else if (tabletPortrait < width && tablet > width) {
      updateDeviceStatus = { ...deviceStatus, isTablet: true }
    } else if (mobile > width) {
      updateDeviceStatus = { ...deviceStatus, isMobile: true }
    } else {
      updateDeviceStatus = { ...deviceStatus }
    }
    setDeviceStatus({ ...updateDeviceStatus })
  }

  React.useEffect(() => {
    const { addEventListener = () => "", removeEventListener = () => "" } =
      window || {}
    addEventListener("resize", onUpdateResize)
    onUpdateResize()
    return () => removeEventListener("resize", onUpdateResize)
  }, [])

  return { deviceStatus, displaySize, orientationStatus }
}

export { useMediaQuery }
