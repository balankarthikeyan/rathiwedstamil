import React from 'react'
import NextLink from 'next/link'

const Link = ({
  label = '',
  href = '',
  renderChildren = () => <></>,
  ...restProps
}) => {
  return (
    <NextLink href={href} {...restProps}>
      <a>
        {label ? label : ''}
        {renderChildren()}
      </a>
    </NextLink>
  )
}

export { Link }
export default Link
