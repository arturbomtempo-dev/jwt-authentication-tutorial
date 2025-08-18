const btn = document.getElementById('loadProfile');
const out = document.getElementById('out');

btn.addEventListener('click', async () => {
    try {
        const res = await fetch('/user/profile');
        const json = await res.json();
        out.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
        out.textContent = err?.message || 'Erro ao buscar perfil';
    }
});
