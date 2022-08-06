const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use('/', express.static('./build'))
app.listen(port , (error) => {
  if(error) return console.log(error)
  console.log(`Listening on port ${port}`)
})

