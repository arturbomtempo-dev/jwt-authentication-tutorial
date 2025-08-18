const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
