const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//@route POST api/users
//@desc Register user
//@access Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please include a valid email').isEmail(),
		check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		console.log(req.body) // debug purposes

		const { name, email, password } = req.body

		try {
			let user = await User.findOne({ email })

			//check if user exists already
			if (user) {
				res.status(400).json({ errors: [{ msg: 'User Already exists' }] })
			}

			//get users gravatar
			const avatar = gravatar.url(email, { s: '200', r: 'pg', default: 'mm' })

			user = new User({ name: name, email: email, avatar: avatar, password: password })

			//encrpyt users password
			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(password, salt)

			//saves the user to the database
			await user.save()

			//return json web token
			const payload = {
				user: { id: user.id },
			}

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err
				res.json({ token })
			})

			// res.send('User Registered')
		} catch (err) {
			console.log(err.message)
			return res.status(500).send('Server Error')
		}
	}
)

module.exports = router
