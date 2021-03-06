const express = require('express')

const app = express()
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const helmet = require('helmet')

// const options = require('./swagger/swaggerSpec.js')
const index = require('./src/routes') // 재현수정

const swaggerDefinition = {
  info: { // API informations (required)
    title: 'woong\'s potato', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'woong\'s potato', // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/', // Base path (optional)
}

const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./swagger/woong_api.yml'],
}

const swaggerSpec = swaggerJSDoc(options)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
