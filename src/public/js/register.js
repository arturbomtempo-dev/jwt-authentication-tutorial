const form = document.getElementById('registerForm');
const out = document.getElementById('out');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        out.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
        out.textContent = err?.message || 'Erro no cadastro';
    }
});
