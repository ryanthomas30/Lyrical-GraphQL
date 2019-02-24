
import express from 'express'
import models from './models'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import schema from './schema/schema'

const app = express()

// Replace with your mongoLab URI
const MONGO_URI = `mongodb://ryan:test@cluster0-shard-00-00-8kc4v.mongodb.net:27017,cluster0-shard-00-01-8kc4v.mongodb.net:27017,cluster0-shard-00
	-02-8kc4v.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error))

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
app.use(webpackMiddleware(webpack(webpackConfig)))

module.exports = app
