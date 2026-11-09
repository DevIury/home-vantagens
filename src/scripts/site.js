        // Acordeão FAQ
        document.querySelectorAll('.faq-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const answer = btn.nextElementSibling;
                const icon = btn.querySelector('i');
                const isOpen = !answer.classList.contains('hidden');

                document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
                document.querySelectorAll('.faq-btn i').forEach(ic => {
                    ic.classList.remove('fa-minus');
                    ic.classList.add('fa-plus');
                });

                if (!isOpen) {
                    answer.classList.remove('hidden');
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });

        // Menu Mobile Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        window.setMobileMenu = function (open) {
            mobileMenu.classList.toggle('hidden', !open);
            mobileMenuBtn.setAttribute('aria-expanded', String(open));
            mobileMenuBtn.setAttribute('aria-label', open ? 'Fechar Menu' : 'Abrir Menu');
            mobileMenuBtn.innerHTML = open
                ? '<i class="fa-solid fa-xmark text-lg text-hv-orange"></i>'
                : '<i class="fa-solid fa-bars text-lg text-hv-orange"></i>';
        };
        mobileMenuBtn.addEventListener('click', () => window.setMobileMenu(mobileMenu.classList.contains('hidden')));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.setMobileMenu(false); });
        mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a, button')) window.setMobileMenu(false); });