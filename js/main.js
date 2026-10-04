// ===== Modo claro / oscuro =====
const raiz = document.documentElement;
const botonTema = document.querySelector('.tema');
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)');

function temaActual() {
    return raiz.dataset.theme || (prefiereOscuro.matches ? 'dark' : 'light');
}

function actualizarBoton() {
    const oscuro = temaActual() === 'dark';
    botonTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

if (botonTema) {
    actualizarBoton();
    prefiereOscuro.addEventListener('change', actualizarBoton);
    botonTema.addEventListener('click', () => {
        const nuevo = temaActual() === 'dark' ? 'light' : 'dark';
        raiz.dataset.theme = nuevo;
        try { localStorage.setItem('tema', nuevo); } catch (e) { /* sin almacenamiento: solo dura esta visita */ }
        actualizarBoton();
    });
}

// ===== Aparecer al hacer scroll =====
const revelables = document.querySelectorAll('.revelar');
if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    revelables.forEach((el) => observador.observe(el));
} else {
    revelables.forEach((el) => el.classList.add('visible'));
}

// ===== Marcar en el menú la sección que se está viendo =====
const enlacesMenu = document.querySelectorAll('.menu a[href^="#"]');
if (enlacesMenu.length && 'IntersectionObserver' in window) {
    const espia = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            enlacesMenu.forEach((a) => {
                a.classList.toggle('activo', a.getAttribute('href') === '#' + entrada.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => espia.observe(s));
}

// ===== Año del footer =====
document.querySelectorAll('.anio').forEach((el) => { el.textContent = new Date().getFullYear(); });
