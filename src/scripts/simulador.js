        // Formatador Monetário BRL
        const formatBRL = (val) => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            }).format(val);
        };

        // -------------------------------------------------------------------
        // 4. TERMINAL DE SIMULAÇÃO (MODO DUPLO: NOVO CRÉDITO + PORTABILIDADE)
        // -------------------------------------------------------------------
        window.switchCalculatorMode = function(mode) {
            const modeNovo = document.getElementById('calcModeNovo');
            const modePort = document.getElementById('calcModePortabilidade');
            const btnNovo = document.getElementById('modeBtnNovo');
            const btnPort = document.getElementById('modeBtnPort');

            if (mode === 'portabilidade') {
                modeNovo.classList.add('hidden');
                modePort.classList.remove('hidden');
                modePort.classList.add('grid');
                btnPort.className = 'px-4 py-2.5 rounded-lg bg-hv-orange text-white font-display font-bold text-xs uppercase tracking-wider transition-all';
                btnNovo.className = 'px-4 py-2.5 rounded-lg text-white/75 hover:text-white font-display font-bold text-xs uppercase tracking-wider transition-all';
                updatePortabilityCalc();
            } else {
                modePort.classList.add('hidden');
                modePort.classList.remove('grid');
                modeNovo.classList.remove('hidden');
                btnNovo.className = 'px-4 py-2.5 rounded-lg bg-hv-orange text-white font-display font-bold text-xs uppercase tracking-wider transition-all';
                btnPort.className = 'px-4 py-2.5 rounded-lg text-white/75 hover:text-white font-display font-bold text-xs uppercase tracking-wider transition-all';
                updateTerminalCalc();
            }
        };

        // Estado do Modo A (Cotação de Saúde e Seguros)
        let termState = {
            mod: 'saude',
            base: 49,
            mult: 1.22,
            label: 'Plano de Saúde',
            speed: '24h a 7 dias',
            slider: 'vidas'
        };

        const termAmountEl = document.getElementById('termAmount');
        const termMonthsEl = document.getElementById('termMonths');
        const termProfileLabel = document.getElementById('termProfileLabel');
        const termProfileTicks = document.getElementById('termProfileTicks');
        let currentSliderType = 'vidas';

        function updateTerminalCalc() {
            const age = parseInt(termAmountEl.value, 10) || 35;
            const profileVal = parseFloat(termMonthsEl.value) || 1;
            const ageFactor = 1 + Math.max(0, age - 30) * 0.012;

            let monthly, profileText, profileDisplay;

            if (termState.slider === 'vidas') {
                monthly = Math.max(45, termState.base * profileVal); // mensalidade fixa por vida (sem variação por idade)
                profileText = `${age} anos • ${profileVal} ${profileVal === 1 ? 'vida' : 'vidas'}`;
                profileDisplay = `${profileVal} ${profileVal === 1 ? 'vida' : 'vidas'}`;
            } else {
                monthly = Math.max(79, termState.base * profileVal * ageFactor);
                profileText = `${age} anos • ${formatBRL(profileVal)}`;
                profileDisplay = formatBRL(profileVal);
            }

            const market = monthly * termState.mult;
            const savings = market - monthly;

            document.getElementById('termAmountDisplay').textContent = `${age} anos`;
            document.getElementById('termMonthsDisplay').textContent = profileDisplay;
            document.getElementById('termModalityBadge').textContent = termState.label;
            document.getElementById('termSummaryNet').textContent = profileText;
            document.getElementById('termSummarySpeed').textContent = termState.speed;
            document.getElementById('termBankRateLabel').textContent = `+${Math.round((termState.mult - 1) * 100)}%`;
            document.getElementById('termBankPmtDisplay').textContent = `${formatBRL(market)} /mês`;
            document.getElementById('termOurPmtDisplay').textContent = `${formatBRL(monthly)} /mês`;
            document.getElementById('termTotalSavingsBadge').textContent = `Economia estimada: ${formatBRL(savings)}/mês`;

            document.getElementById('termResultLabel').textContent = 'Mensalidade Estimada:';
            document.getElementById('termResultValue').textContent = formatBRL(monthly);
            document.getElementById('termResultSub').textContent = `Perfil ${age} anos • referência sujeita a análise da operadora`;

            const wpMessage = `Olá! Fiz uma cotação no portal da Home Vantagens:\n\n• *Produto:* ${termState.label}\n• *Perfil:* ${profileText}\n• *Mensalidade Estimada:* ${formatBRL(monthly)}\n\nGostaria de receber as propostas oficiais das operadoras parceiras.`;
            document.getElementById('termWhatsappLink').href = `https://wa.me/5500000000000?text=${encodeURIComponent(wpMessage)}`;
        }

        function configureProfileSlider(type) {
            if (type === 'veiculo') {
                termProfileLabel.textContent = 'Passo 03 • Valor do Veículo';
                termMonthsEl.min = 20000;
                termMonthsEl.max = 250000;
                termMonthsEl.step = 5000;
                termMonthsEl.value = 60000;
                termProfileTicks.innerHTML = '<span>R$ 20 mil</span><span>R$ 80 mil</span><span>R$ 160 mil</span><span>R$ 250 mil</span>';
            } else {
                termProfileLabel.textContent = 'Passo 03 • Quantidade de Vidas';
                termMonthsEl.min = 1;
                termMonthsEl.max = 6;
                termMonthsEl.step = 1;
                termMonthsEl.value = 1;
                termProfileTicks.innerHTML = '<span>1</span><span>2</span><span>4</span><span>6</span>';
            }
        }

        function activateTerminalModality(modKey) {
            let selected = null;
            document.querySelectorAll('.term-mod-btn').forEach(btn => {
                if (btn.dataset.mod === modKey) {
                    selected = btn;
                    btn.className = 'term-mod-btn py-3 px-3 rounded-xl border-2 border-hv-navy bg-hv-navy text-white font-display font-bold text-xs text-center transition-all';
                } else {
                    btn.className = 'term-mod-btn py-3 px-3 rounded-xl border border-hv-border bg-alabaster text-hv-navy hover:border-hv-navy/40 font-display font-semibold text-xs text-center transition-all';
                }
            });
            if (!selected) return;

            termState.mod = selected.dataset.mod;
            termState.base = parseFloat(selected.dataset.base);
            termState.mult = parseFloat(selected.dataset.mult);
            termState.label = selected.dataset.label;
            termState.speed = selected.dataset.speed;
            termState.slider = selected.dataset.slider;

            if (termState.slider !== currentSliderType) {
                currentSliderType = termState.slider;
                configureProfileSlider(currentSliderType);
            }

            updateTerminalCalc();
        }

        document.querySelectorAll('.term-mod-btn').forEach(btn => {
            btn.addEventListener('click', () => activateTerminalModality(btn.dataset.mod));
        });
        termAmountEl.addEventListener('input', updateTerminalCalc);
        termMonthsEl.addEventListener('input', updateTerminalCalc);

        // Estado do Modo B (Comparador Consórcio x Financiamento)
        const simAssetEl = document.getElementById('simAssetValue');
        const simMonthsEl = document.getElementById('simMonths');
        const simFinRateEl = document.getElementById('simFinRate');

        function updatePortabilityCalc() {
            const asset = Math.max(5000, parseFloat(simAssetEl.value) || 60000);
            const n = Math.min(240, Math.max(12, parseInt(simMonthsEl.value, 10) || 120));
            const rate = Math.max(0.001, (parseFloat(simFinRateEl.value) || 1.29) / 100);
            const adminFee = 0.18;

            const consortiumPmt = (asset * (1 + adminFee)) / n;
            const financingPmt = (asset * rate) / (1 - Math.pow(1 + rate, -n));
            const financingTotal = financingPmt * n;
            const consortiumTotal = asset * (1 + adminFee);
            const savings = Math.max(0, financingTotal - consortiumTotal);

            document.getElementById('simFinRateDisplay').textContent = `${(rate * 100).toFixed(2).replace('.', ',')}% a.m.`;
            document.getElementById('consorcioPmtResult').innerHTML = `${formatBRL(consortiumPmt)} <span class="text-sm font-normal text-white/60">/mês</span>`;
            document.getElementById('financiamentoPmtResult').innerHTML = `${formatBRL(financingPmt)} <span class="text-sm font-normal text-white/60">/mês</span>`;
            document.getElementById('financiamentoTotalResult').textContent = `Custo total estimado: ${formatBRL(financingTotal)} • Economia no consórcio: ${formatBRL(savings)}`;

            const wpPortMsg = `Olá! Simulei *Consórcio x Financiamento* no site da Home Vantagens:\n\n• *Valor do Bem:* ${formatBRL(asset)}\n• *Prazo:* ${n} meses\n• *Parcela Consórcio:* ${formatBRL(consortiumPmt)}\n• *Parcela Financiamento:* ${formatBRL(financingPmt)} (${(rate * 100).toFixed(2).replace('.', ',')}% a.m.)\n• *Economia estimada:* ${formatBRL(savings)}\n\nGostaria de uma simulação oficial.`;
            document.getElementById('consorcioWhatsappLink').href = `https://wa.me/5500000000000?text=${encodeURIComponent(wpPortMsg)}`;
        }

        simAssetEl.addEventListener('input', updatePortabilityCalc);
        simMonthsEl.addEventListener('input', updatePortabilityCalc);
        simFinRateEl.addEventListener('input', updatePortabilityCalc);
// Inicialização dos dois modos + modo vindo da URL (#saude/#protecao/#auto/#consorcio/#portabilidade)
document.addEventListener('DOMContentLoaded', () => {
    updateTerminalCalc();
    updatePortabilityCalc();
    const h = window.location.hash.replace('#', '');
    if (['saude', 'protecao', 'auto'].includes(h)) activateTerminalModality(h);
    else if (['consorcio', 'portabilidade'].includes(h)) switchCalculatorMode('portabilidade');
});
