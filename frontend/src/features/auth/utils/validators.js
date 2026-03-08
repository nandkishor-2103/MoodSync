import { toast } from 'react-hot-toast';

// ── Shared validation rules ─────────────────────────────────────
// Username: lowercase, starts with a letter, letters/numbers/underscores only
const USERNAME_REGEX = /^[a-z][a-z0-9_]*$/;

// Email: local@domain.tld — TLD must be 2–10 alphabetic chars
const EMAIL_REGEX = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;

/**
 * Validates a username field. Shows a toast and returns false on the first failure.
 * @param {string} value - raw input value
 * @returns {boolean} true if valid
 */
export function validateUsername(value) {
    const v = value.trim();
    if (!v) {
        toast.error('Username is required.');
        return false;
    }
    if (v.length < 3) {
        toast.error('Username must be at least 3 characters long.');
        return false;
    }
    if (v.length > 20) {
        toast.error('Username must be 20 characters or fewer.');
        return false;
    }
    if (!USERNAME_REGEX.test(v)) {
        toast.error(
            'Username must be lowercase, start with a letter, and can only contain lowercase letters, numbers, and underscores (no spaces).',
        );
        return false;
    }
    return true;
}

/**
 * Validates an email field. Shows a toast and returns false on the first failure.
 * @param {string} value - raw input value
 * @returns {boolean} true if valid
 */
export function validateEmail(value) {
    const v = value.trim();
    if (!v) {
        toast.error('Email address is required.');
        return false;
    }
    if (!EMAIL_REGEX.test(v) || v.split('@').length !== 2) {
        toast.error('Please enter a valid email address (e.g. you@example.com).');
        return false;
    }
    return true;
}

/**
 * Validates a password field. Shows a toast and returns false on the first failure.
 * Pass `required = false` for optional password fields (e.g. profile update).
 * @param {string} value - raw input value
 * @param {boolean} [required=true] - whether blank is considered an error
 * @returns {boolean} true if valid (or blank when not required)
 */
export function validatePassword(value, required = true) {
    if (!value) {
        if (required) {
            toast.error('Password is required.');
            return false;
        }
        return true; // blank is fine for optional fields
    }
    if (value.length < 8) {
        toast.error('Password must be at least 8 characters long.');
        return false;
    }
    return true;
}

/**
 * Validates that two password values match. Shows a toast and returns false if they don't.
 * Only runs the check when `password` is non-empty.
 * @param {string} password
 * @param {string} confirm
 * @returns {boolean}
 */
export function validatePasswordMatch(password, confirm) {
    if (password && password !== confirm) {
        toast.error("Passwords don't match. Please try again.");
        return false;
    }
    return true;
}
