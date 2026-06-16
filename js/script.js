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

   document.addEventListener('DOMContentLoaded', () => {
    const problemForm = document.getElementById('problem-form');
    
    if (problemForm) {
        problemForm.addEventListener('submit', async (event) => {
            // 1. Bloqueia o comportamento padrão de atualizar a página
            event.preventDefault();
            
            // 2. Mapeamento de interface para feedback visual dinâmico
            const submitBtn = problemForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            const originalText = btnText.textContent;
            const originalIconClass = btnIcon.className;
            
            // 3. Aplicação do Loading State (Previne cliques duplicados)
            submitBtn.disabled = true;
            submitBtn.className = "w-full bg-slate-800 text-slate-400 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 cursor-not-allowed mt-4 shadow-none";
            btnText.textContent = 'Processando Diagnóstico...';
            btnIcon.className = 'fa-solid fa-circle-notch animate-spin text-[10px]';
            
            // 4. Captura automatizada de todos os inputs do formulário
            const formData = new FormData(problemForm);
            
            try {
                // 5. Disparo da requisição via Fetch API para o endpoint de destino
                const response = await fetch(problemForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // 6. Feedback Visual de Sucesso
                    btnText.textContent = 'Análise Enviada com Sucesso!';
                    btnIcon.className = 'fa-solid fa-check text-emerald-400 text-[10px]';
                    submitBtn.className = "w-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 mt-4 shadow-lg";
                    
                    // Reseta os campos do formulário para novas consultas
                    problemForm.reset();
                    
                    // Fecha o drawer de forma polida após 3 segundos
                    setTimeout(() => {
                        if (typeof window.closeTechnicalDrawer === 'function') {
                            window.closeTechnicalDrawer();
                        }
                        // Restaura o botão ao layout padrão original
                        submitBtn.disabled = false;
                        submitBtn.className = "w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/10 transition-all active:scale-98 mt-4";
                        btnText.textContent = originalText;
                        btnIcon.className = originalIconClass;
                    }, 3000);
                    
                } else {
                    throw new Error('Erro de resposta do servidor.');
                }
                
            } catch (error) {
                // 7. Tratamento de Exceções e Feedback de Falha
                console.error('Falha no processamento:', error);
                btnText.textContent = 'Erro ao enviar. Tente novamente.';
                btnIcon.className = 'fa-solid fa-triangle-exclamation text-rose-400 text-[10px]';
                submitBtn.className = "w-full bg-rose-950/50 border border-rose-500/30 text-rose-400 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 mt-4 shadow-lg";
                
                // Reativa o botão para nova tentativa após 4 segundos
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.className = "w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/10 transition-all active:scale-98 mt-4";
                    btnText.textContent = originalText;
                    btnIcon.className = originalIconClass;
                }, 4000);
            }
        });
    }
});