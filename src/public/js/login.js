const form = document.getElementById('loginForm');
const out = document.getElementById('out');
const logoutBtn = document.getElementById('logoutBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const email = (fd.get('email') || '').trim();
    const username = (fd.get('username') || '').trim();
    const password = (fd.get('password') || '').trim();

    if (!password || (!email && !username)) {
        out.textContent = 'Preencha email ou username e senha para logar.';
        return;
    }

    const payload = { password };

    if (email) {
        payload.email = email;
    }

    if (username) {
        payload.username = username;
    }

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        let data;

        try {
            data = await res.json();
        } catch {
            data = { error: 'Resposta inválida do servidor' };
        }

        out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        out.textContent = err?.message || 'Erro no login';
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('/auth/logout', { method: 'POST' });
        let data;

        try {
            data = await res.json();
        } catch {
            data = { error: 'Resposta inválida do servidor' };
        }
        
        out.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        out.textContent = err?.message || 'Erro no logout';
    }
});
