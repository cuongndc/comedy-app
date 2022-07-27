export const convertUnit = (unit) => {
  const pUnit = parseFloat(unit)
  if (pUnit > 1000000)
    return `${(pUnit / 1000000).toFixed(1)} M`
  else if (pUnit > 1000)
    return `${(pUnit / 1000).toFixed(1)} K`
  else
    return `${pUnit}`
}

export const followConvert = (follow) => {
  if (parseFloat(follow))
    return `${parseFloat(follow).toFixed(2)}K`

  return 'N/a'
}
