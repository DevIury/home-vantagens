        // -------------------------------------------------------------------
        // 2. FICHAS TÉCNICAS DA PÁGINA "SOLUÇÕES & PRODUTOS"
        // -------------------------------------------------------------------
        const catalogDetails = {
            saude: {
                code: 'FICHA TÉCNICA #01 • SAÚDE SUPLEMENTAR',
                title: 'Planos de Saúde Individuais, Familiares e PME',
                desc: 'Mensalidade fixa a partir de R$ 45, com reembolso de medicamentos e exames. Nossa mesa analisa seu perfil e indica a melhor opção para você, sua família ou sua empresa.',
                bullets: [
                    'Mensalidade fixa, sem surpresas',
                    'Reembolso de medicamentos e exames',
                    'Opções individuais e familiares',
                    'Atendimento para empresas (PME)'
                ],
                rate: 'A partir de R$ 45,00/mês',
                term: 'Regional ou nacional (ANS)',
                margin: 'Reembolso de medicamentos e exames',
                credit: 'Sem análise de score',
                docs: 'RG/CPF + Comprovante de Residência'
            },
            protecao: {
                code: 'FICHA TÉCNICA #02 • PROTEÇÃO PATRIMONIAL',
                title: 'Proteção Veicular com Assistência 24h',
                desc: 'Uma alternativa econômica ao seguro tradicional, com cobertura para roubo, furto, colisão e incêndio, além de assistência 24h e guincho em todo o território nacional. Indicada para veículos de uso particular e também para motoristas de aplicativo.',
                bullets: [
                    'Roubo, furto, colisão e incêndio',
                    'Assistência 24h com guincho nacional',
                    'Cobertura para uso particular e aplicativo',
                    'Vistoria digital e adesão sem burocracia'
                ],
                rate: 'A partir de R$ 79,00/mês',
                term: 'Nacional, conforme plano',
                margin: 'Carência de 30 a 90 dias',
                credit: 'Sem análise de score',
                docs: 'RG/CPF + Documento do veículo'
            },
            auto: {
                code: 'FICHA TÉCNICA #03 • SEGURO AUTO',
                title: 'Seguro de Carro com Cobertura sob Medida',
                desc: 'Cotamos seu perfil em seguradoras parceiras para montar uma apólice com a cobertura que você realmente precisa: colisão, roubo, furto, incêndio, carro reserva, assistência 24h e proteção para terceiros, com franquia e preço ajustados ao seu uso.',
                bullets: [
                    'Colisão, roubo, furto e incêndio',
                    'Carro reserva e assistência 24h',
                    'Proteção para terceiros e passageiros',
                    'Franquia reduzida e desconto por perfil'
                ],
                rate: 'A partir de R$ 120,00/mês',
                term: 'Vigência anual renovável',
                margin: 'Cobertura nacional',
                credit: 'Análise de perfil e veículo',
                docs: 'RG/CPF + CNH + Documento do veículo'
            },
            consorcio: {
                code: 'FICHA TÉCNICA #04 • PATRIMÔNIO PLANEJADO',
                title: 'Consórcio e Financiamento para Imóvel, Auto e Projetos',
                desc: 'Planeje a compra do seu imóvel, carro ou projeto sem os juros de um financiamento tradicional. No consórcio você paga apenas taxa de administração e fundo de reserva, com contemplação por sorteio ou lance; se precisar do bem agora, comparamos também as linhas de financiamento dos bancos parceiros.',
                bullets: [
                    'Consórcio sem juros com taxa de administração',
                    'Financiamento com parcela imediata',
                    'Prazos de 12 a 240 meses',
                    'Simulação e assembleias acompanhadas'
                ],
                rate: 'Parcelas a partir de R$ 499,00',
                term: '12 a 240 meses',
                margin: 'Taxa de administração estimada de 18%',
                credit: 'Análise conforme instituição',
                docs: 'RG/CPF + Comprovante de Renda'
            }
        };

        window.switchCatalogDetail = function(solKey) {
            const d = catalogDetails[solKey];
            if (!d) return;
            window.currentSol = solKey;

            document.querySelectorAll('.sol-tab-btn').forEach(btn => {
                if (btn.dataset.sol === solKey) {
                    btn.className = 'sol-tab-btn p-4 rounded-xl border-2 border-hv-navy bg-hv-navy text-white text-left transition-all';
                    btn.querySelector('span:first-child').className = 'text-[10px] font-mono uppercase tracking-wider text-hv-orange block';
                } else {
                    btn.className = 'sol-tab-btn p-4 rounded-xl border border-hv-border bg-white text-hv-navy hover:border-hv-navy/40 text-left transition-all';
                    btn.querySelector('span:first-child').className = 'text-[10px] font-mono uppercase tracking-wider text-hv-slate block';
                }
            });

            document.getElementById('solDetailCode').textContent = d.code;
            document.getElementById('solDetailTitle').textContent = d.title;
            document.getElementById('solDetailDesc').textContent = d.desc;
            document.getElementById('solSpecRate').textContent = d.rate;
            document.getElementById('solSpecTerm').textContent = d.term;
            document.getElementById('solSpecMargin').textContent = d.margin;
            document.getElementById('solSpecCredit').textContent = d.credit;
            document.getElementById('solSpecDocs').textContent = d.docs;

            const bulletsContainer = document.getElementById('solDetailBullets');
            bulletsContainer.innerHTML = d.bullets.map(b => `
                <div class="flex items-center gap-2.5 bg-alabaster p-3 rounded-lg border border-hv-border">
                    <i class="fa-solid fa-check text-hv-orange"></i>
                    <span>${b}</span>
                </div>
            `).join('');
        };
// Inicialização: abre a ficha indicada na URL (#saude, #protecao, #auto, #consorcio)
document.addEventListener('DOMContentLoaded', () => {
    const h = window.location.hash.replace('#', '');
    if (catalogDetails[h]) window.switchCatalogDetail(h);
});
