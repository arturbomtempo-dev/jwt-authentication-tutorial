const btn = document.getElementById('loadDashboard');
const out = document.getElementById('out');

btn.addEventListener('click', async () => {
    try {
        const res = await fetch('/admin/dashboard');
        const json = await res.json();
        out.textContent = JSON.stringify(json, null, 2);
    } catch (err) {
        out.textContent = err?.message || 'Erro ao carregar dashboard';
    }
});
