// creating a base name for mongodb
const projectDataBaseName = 'server'

// create the mongodb uri for development and test
// database name will be either `dnd-campaign-tracker-development` for local development or `dnd-campaign-tracker-test` for local testing
const database = {
	development: `mongodb://127.0.0.1:27020/${projectDataBaseName}-development`,
	test: `mongodb://127.0.0.1:27020/${projectDataBaseName}-test`,
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable DB_URI will be available in
// heroku production environment otherwise use test or development db
const currentDb = process.env.DB_URI || localDb

module.exports = currentDb