import fs from 'fs-extra'

try {
  fs.copySync('./src/assets', './dist/assets')
  console.log('Assets copy success!')
} catch (error) {
  console.error(error)
}
