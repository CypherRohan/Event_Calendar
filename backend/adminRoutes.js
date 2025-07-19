const express = require('express');
const router = express.Router();
const permission = require('./models/permission');
const pendingSignup = require('./models/pendingSignup');
const User = require('./models/user');

// Simple admin auth middleware (replace with JWT in production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
router.use((req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'];
  if (adminSecret !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
});

// Add email to permission table
router.post('/permission', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  try {
    await permission.create({ email });
    res.status(201).json({ message: 'Permission granted' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding permission', error: err.message });
  }
});

// List pending signups
router.get('/pending-signups', async (req, res) => {
  try {
    const pendings = await pendingSignup.find();
    res.json(pendings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending signups', error: err.message });
  }
});

// Approve a pending signup (move to permission, delete from pending)
router.post('/approve-signup', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  try {
    const pending = await pendingSignup.findOneAndDelete({ email });
    if (!pending) return res.status(404).json({ message: 'Pending signup not found' });
    await permission.create({ email });
    res.json({ message: 'Signup approved and permission granted' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving signup', error: err.message });
  }
});

// Reject a pending signup (delete from pending)
router.post('/reject-signup', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  try {
    await pendingSignup.findOneAndDelete({ email });
    res.json({ message: 'Signup rejected and removed from pending' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting signup', error: err.message });
  }
});

// List all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password for privacy
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Delete user by email or id
router.delete('/user', async (req, res) => {
  const { email, id } = req.body;
  if (!email && !id) return res.status(400).json({ message: 'Email or ID required' });
  try {
    const query = email ? { email } : { _id: id };
    const deleted = await User.findOneAndDelete(query);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    // Also remove from permission table
    await permission.deleteOne({ email: deleted.email });
    res.json({ message: 'User deleted and permission removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

module.exports = router; 