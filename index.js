require('@babel/register')({
	presets: [ '@babel/preset-env' ]
})

const app = require('./server/server')

app.listen(4000, () => {
  console.log('Listening')
})
