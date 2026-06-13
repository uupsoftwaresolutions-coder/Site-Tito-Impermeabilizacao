/* ==========================================================================
   🧠 MOTOR JAVASCRIPT: INTERCEPTADOR DE TRIAGEM AUTOMÁTICA (UUP FRAMEWORK)
   ========================================================================== */

// Configuração do terminal de destino estável
const TELEPHONE_TARGET = "5562993549099";

document.addEventListener("DOMContentLoaded", () => {
    bindFormInterception();
    bindMobileMenu(); // ➕ Adicione essa chamada aqui
});

/**
 * Controla os gatilhos e animações do botão sanduíche mobile.
 */
function bindMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    
    // Elementos internos para o efeito de transformação em X
    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        const isOpened = mobileMenu.classList.contains("translate-y-0");

        if (isOpened) {
            mobileMenu.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
            mobileMenu.classList.add("-translate-y-full", "opacity-0", "pointer-events-none");
            
            bar1.classList.remove("rotate-45", "translate-y-2");
            bar2.classList.remove("opacity-0");
            bar3.classList.remove("-rotate-45", "-translate-y-2");
        } else {
            mobileMenu.classList.remove("-translate-y-full", "opacity-0", "pointer-events-none");
            mobileMenu.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
            
            bar1.classList.add("rotate-45", "translate-y-2");
            bar2.classList.add("opacity-0");
            bar3.classList.add("-rotate-45", "-translate-y-2");
        }
    });

    // Fecha o menu se clicar em uma das opções
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.click();
        });
    });
}