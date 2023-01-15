/* eslint-disable no-unsafe-optional-chaining */
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)?.split('-')?.join(' ')
}

export { capitalizeFirstLetter }
