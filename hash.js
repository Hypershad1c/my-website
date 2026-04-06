const b = require('bcryptjs')
b.hash('Ok123456', 10).then(hash => {
  console.log('HASH:', hash)
  return b.compare('Ok123456', hash).then(valid => {
    console.log('VALID:', valid)
  })
})