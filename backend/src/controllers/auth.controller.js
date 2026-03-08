const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
        return res.status(409).json({
            message: 'Email is already registered. Please use a different email or login.',
        });
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
        return res.status(409).json({
            message: 'Username is already taken. Please choose another one.',
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
    });

    return res.status(201).json({
        message: 'user registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUser(req, res) {
    const { email, username, password } = req.body;

    const user = await userModel
        .findOne({
            $or: [{ email }, { username }],
        })
        .select('+password');

    if (!user) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid credentials',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '3d' },
    );

    res.cookie('token', token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}

/**
 * @desc Get current user (Soft-auth)
 * @route GET /api/auth/get-me
 * @access Public (Verifies inside)
 */
async function getMe(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({
            message: 'Session not found',
            user: null,
        });
    }

    try {
        const isTokenBlackListed = await redis.get(token);
        if (isTokenBlackListed) {
            return res.status(200).json({ message: 'Session invalid', user: null });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        res.status(200).json({
            message: 'User fetched successfully',
            user,
        });
    } catch (error) {
        res.status(200).json({
            message: 'Session expired',
            user: null,
        });
    }
}

/**
 * @desc Logout a user
 * @route POST /api/auth/logout
 * @access Private
 */
async function logoutUser(req, res) {
    const token = req.cookies.token;

    res.clearCookie('token');

    await redis.set(token, Date.now().toString(), 'EX', 3 * 24 * 60 * 60);

    res.status(200).json({
        message: 'User Logout Successfully',
    });
}

/**
 * @desc Update current user (email, username, password)
 * @route PATCH /api/auth/update-me
 * @access Private
 */
async function updateUser(req, res) {
    const { username, email, password } = req.body;
    const userId = req.user.id;

    if (email) {
        const existingEmail = await userModel.findOne({ email, _id: { $ne: userId } });
        if (existingEmail) {
            return res.status(409).json({
                message: 'Email is already registered by another account.',
            });
        }
    }

    if (username) {
        const existingUsername = await userModel.findOne({ username, _id: { $ne: userId } });
        if (existingUsername) {
            return res.status(409).json({
                message: 'Username is already taken. Please choose another one.',
            });
        }
    }

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: updateFields }, { returnDocument: 'after' });

    return res.status(200).json({
        message: 'Profile updated successfully',
        user: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        },
    });
}

module.exports = { registerUser, loginUser, getMe, logoutUser, updateUser };
