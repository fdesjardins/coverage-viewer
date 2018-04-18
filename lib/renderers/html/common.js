const colorInterpolate = require('color-interpolate')

const colors = (exports.colors = {
  yellow: 'rgba(245, 245, 155, 0.75)',
  red: 'rgba(245, 150, 120, 0.75)',
  green: 'rgba(130, 200, 155, 0.75)',
  lyellow: 'rgba(245, 245, 155, 0.5)',
  lred: 'rgba(245, 150, 120, 0.5)',
  lgreen: 'rgba(130, 200, 155, 0.5)'
})

exports.getPercentColor = percent => {
  if (!parseFloat(percent) && parseFloat(percent) !== 0) {
    return 'rgba(175, 175, 175, 0.5)'
  }
  return colorInterpolate([ colors.red, colors.yellow, colors.green ])(percent)
}

exports.formatPercent = percent => {
  const fixed = parseFloat(percent * 100)
  if (fixed || fixed === 0) {
    return `${fixed.toFixed(2)}%`
  }
  return ''
}
