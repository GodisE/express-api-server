// Require the needed npm packages
const passport = require('passport')
//passport is an authentication middleware for nodejs
//you provide Passport a request to authenticate, and Passport provides 
//hooks for controlling what occurs when authentication succeeds or fails.
const bcrypt = require('bcrypt')
//bcrypt a password hashing function used to "hash & salt"(save?) 
//hashed means it cannot be decrypted
//salting adds random characters before or after a password
//to hide the actual password
//passwords securely 
const jwt = require('jsonwebtoken')
//jwt- json web token library
//info exchange
//certain that the senders are who they say they are
//allows you to verify that the content hasn't been tampered with



// Create a secret to be used to encrypt/decrypt the token
// This can be any string value you want -- even gibberish.
const secret = process.env.JWT_SECRET || 'some string value only your app knows'
//secrets are non-human privelaged credentials,
//a private piece of info that act as a key to unlock sensitive info


// Require the specific `strategy` we'll use to authenticate
// Require the method that will handle extracting the token
// from each of the requests sent by clients
const { Strategy, ExtractJwt } = require('passport-jwt')
//Strategy, ExtractJwt are classes
//strategies are extensible sets of plugins



// Minimum required options for passport-jwt
const opts = {
	// How passport should find and extract the token from
	// the request.  We'll be sending it as a `bearer` token
	// when we make requests from our front end.
	//assign it to a fiels, ExtractJwtis a class, and in that class
	//there is a fromAuthHeaderAsBearerToken method

	//headers:{
	// "Accept": "application/json",
	// "Authorization": "Bearer fjferhkbsrjjslshfuejakdhkshakaw"
	//}

	//this is a static method bc there is no new
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Any secret string to use that is unique to your app
	// We should store this in an environment variable so it
	// isn't ever pushed to GitHub!
	secretOrKey: secret,
}

// Require the user model
const User = require('../models/user')

// We're configuring the strategy using the constructor from passport
// so we call new and pass in the options we set in the `opts` variable.
// Then we pass it a callback function that passport will use when we call
// this as middleware.  The callback will be passed the data that was
// extracted and decrypted by passport from the token that we get from
// the client request!  This data (jwt_payload) will include the user's id!
const strategy = new Strategy(opts, function (jwt_payload, done) {
	// In the callback we run our custom code. With the data extracted from
	// the token that we're passed as jwt_payload we'll have the user's id.
	// Using Mongoose's `.findById()` method, we find the user in our database
	User.findById(jwt_payload.id)
		// To pass the user on to our route, we use the `done` method that
		// was passed as part of the callback.  The first parameter of
		// done is an error, so we'll pass null for that argument and then
		// pass the user doc from Mongoose.  This adds the user to the request object
		// as request.user!
		//req.body
		//req.params
		//req.user
		.then((user) => done(null, user))
		// If there was an error, we pass it to done so it is eventually handled
		// by our error handlers in Express
		.catch((err) => done(err))
})

// Now that we've constructed the strategy, we 'register' it so that
// passport uses it when we call the `passport.authenticate()`
// method later in our routes
passport.use(strategy)

// Initialize the passport middleware based on the above configuration
passport.initialize()

// Create a variable that holds the authenticate method so we can
// export it for use in our routes
const requireToken = passport.authenticate('jwt', { session: false })
//as a user i have to besigned in to hit my index and create routes


// Create a function that takes the request and a user document
// and uses them to create a token to send back to the user
const createUserToken = (req, user) => {
	// Make sure that we have a user, if it's null that means we didn't
	// find the email in the database.  If there is a user, make sure
	// that the password is correct.  For security reason, we don't want
	// to tell the client whether the email was not found or that the
	// password was incorrect.  Instead we send the same message for both
	// making it much harder for hackers.
	if (
		!user ||
		!req.body.information.password ||
		!bcrypt.compareSync(req.body.information.password, user.password)
	) {
		const err = new Error('The provided username or password is incorrect')
		
		err.statusCode = 422
		//Unprocessable Entity 
		//the server understands the content type of the request entity, 
		//and the syntax of the request entity is correct, but it was unable 
		//to process the contained instructions.
		throw err
	}
	// If no error was thrown, we create the token from user's id and
	// return the token
	return jwt.sign({ id: user._id }, secret, { expiresIn: 36000 })
	//user cant be igned in forever
	//expiresIn is the number of seconds the access token will be valid
}

module.exports = {
	requireToken,
	createUserToken,
}
