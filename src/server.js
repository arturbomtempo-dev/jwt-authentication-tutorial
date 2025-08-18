require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/register', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/login', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/user', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'user.html')));
app.get('/admin', (_req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
