        // -------------------------------------------------------------------
        // 5. FORMULÁRIO DE TRIAGEM E INTERAÇÕES GERAIS
        // -------------------------------------------------------------------
        const triageForm = document.getElementById('triageForm');
        if (triageForm) {
            triageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('triageName').value.trim();
                const profile = document.getElementById('triageProfile').value;
                const mod = document.getElementById('triageModality').value;
                const val = document.getElementById('triageValue').value.trim() || 'A definir na simulação';
                const notes = document.getElementById('triageNotes').value.trim();

                let msg = `Olá! Enviei meu caso pela Central de Atendimento da Home Vantagens:\n\n` +
                          `• *Nome:* ${name}\n` +
                          `• *Perfil:* ${profile}\n` +
                          `• *Operação:* ${mod}\n` +
                          `• *Valor Estimado:* ${val}\n`;
                if (notes) msg += `• *Observação:* ${notes}\n`;

                window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`, '_blank');
            });
        }