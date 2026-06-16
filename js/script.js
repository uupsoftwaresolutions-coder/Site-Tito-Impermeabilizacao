/* ==========================================================================
   🧠 MOTOR JAVASCRIPT: CONTROLE DE HUB E CAPTURA DE LEADS (UUP FRAMEWORK)
   ========================================================================== */

   const TELEPHONE_TARGET = "5562993549099";

   document.addEventListener("DOMContentLoaded", () => {
       initDrawerEngine();
       initHeaderScrollEffect();
       initFormSubmitAJAX();
   });
   
   /**
    * Controla os estados de abertura, fechamento e transições do Hub Técnico Oculto.
    */
   function initDrawerEngine() {
       const toggleBtn = document.getElementById("drawer-toggle");
       const closeBtn = document.getElementById("drawer-close");
       const drawer = document.getElementById("technical-drawer");
   
       if (!drawer) return;
   
       // Função central para abrir o painel lateral
       window.openTechnicalDrawer = function() {
           drawer.classList.remove("translate-x-full", "opacity-0", "pointer-events-none");
           drawer.classList.add("translate-x-0", "opacity-100", "pointer-events-auto");
           document.body.classList.add("overflow-hidden"); // Trava o scroll do fundo
       };
   
       // Função central para fechar o painel lateral
       window.closeTechnicalDrawer = function() {
           drawer.classList.remove("translate-x-0", "opacity-100", "pointer-events-auto");
           drawer.classList.add("translate-x-full", "opacity-0", "pointer-events-none");
           document.body.classList.remove("overflow-hidden"); // Libera scroll do fundo
       };
   
       // Vincula os cliques de forma explícita e direta para evitar sobreposição
       if (toggleBtn) {
           toggleBtn.addEventListener("click", (e) => {
               e.preventDefault();
               window.openTechnicalDrawer();
           });
       }
       
       if (closeBtn) {
           closeBtn.addEventListener("click", (e) => {
               e.preventDefault();
               window.closeTechnicalDrawer();
           });
       }
   
       // Fecha se o usuário pressionar a tecla ESC para melhor usabilidade (UX)
       document.addEventListener("keydown", (e) => {
           if (e.key === "Escape") window.closeTechnicalDrawer();
       });
   }
   
   /**
    * Altera a densidade visual e cor da barra suspensa conforme o scroll acontece.
    */
   function initHeaderScrollEffect() {
       const header = document.getElementById("main-header");
       if (!header) return;
   
       window.addEventListener("scroll", () => {
           if (window.scrollY > 40) {
               header.classList.remove("bg-transparent", "h-24");
               header.classList.add("bg-slate-950/80", "backdrop-blur-xl", "h-20", "border-b", "border-white/5", "shadow-xl");
           } else {
               header.classList.remove("bg-slate-950/80", "backdrop-blur-xl", "h-20", "border-b", "border-white/5", "shadow-xl");
               header.classList.add("bg-transparent", "h-24");
           }
       });
   }
   
   /**
    * Processamento assíncrono do formulário de triagem via AJAX para o FormSubmit.
    */
   function initFormSubmitAJAX() {
       const targetForm = document.getElementById("problem-form");
       if (!targetForm) return;
   
       targetForm.addEventListener("submit", (e) => {
           e.preventDefault(); 
   
           const formData = new FormData(targetForm);
           const submitButton = targetForm.querySelector("button[type='submit']");
           
           // Estado visual de processamento
           submitButton.disabled = true;
           submitButton.innerHTML = `<span>Processando Dados...</span> <i class="fa-solid fa-spinner animate-spin text-xs"></i>`;
   
           fetch(targetForm.action, {
               method: "POST",
               body: formData,
               headers: {
                   'Accept': 'application/json'
               }
           })
           .then(response => {
               if (response.ok) {
                   // Sucesso no disparo para a central de e-mail do dono
                   submitButton.className = "w-full bg-emerald-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-md";
                   submitButton.innerHTML = `<span>Diagnóstico Recebido!</span> <i class="fa-solid fa-check text-xs"></i>`;
                   targetForm.reset();
               } else {
                   throw new Error("Erro no endpoint");
               }
           })
           .catch(error => {
               submitButton.disabled = false;
               submitButton.className = "w-full bg-rose-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-md";
               submitButton.innerHTML = `<span>Falha no Envio. Tentar Novamente</span> <i class="fa-solid fa-xmark text-xs"></i>`;
           });
       });
   }