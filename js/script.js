// Funcionalidade para o Accordion (FAQ)
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Alterna a classe ativa no item clicado
            const parent = this.parentElement;
            parent.classList.toggle('active');

            // Opcional: Fecha os outros itens quando um é aberto
            accordions.forEach(otherAcc => {
                const otherParent = otherAcc.parentElement;
                if (otherParent !== parent) {
                    otherParent.classList.remove('active');
                }
            });
        });
    });

    // Funcionalidade para destacar o menu ativo ao fazer scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// =========================================
    // 1. BARRA DE PROGRESSO DE LEITURA
    // =========================================
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });

    // =========================================
    // 2. MODO ESCURO (DARK MODE)
    // =========================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Verifica se o usuário já tinha ativado antes
    if(localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if(body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // =========================================
    // 3. SCROLL REVEAL (Animação ao rolar)
    // =========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Faz a animação acontecer só 1x
            }
        });
    }, { threshold: 0.15 }); // 15% do elemento precisa aparecer na tela

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================================
    // 4. FILTRO DE CURSOS (Muda o conteúdo dinamicamente)
    // =========================================
    const courseData = {
        computacao: [
            { icon: 'fa-microchip', text: 'Integra hardware e software para criar soluções.' },
            { icon: 'fa-lightbulb', text: 'Resolve problemas reais com inovação.' },
            { icon: 'fa-user-group', text: 'Trabalha em equipe e lidera projetos.' },
            { icon: 'fa-book-open-reader', text: 'Aprende de forma autônoma.' },
            { icon: 'fa-globe', text: 'Atua com ética e impacto positivo.' }
        ],
        licenciatura: [
            { icon: 'fa-chalkboard-user', text: 'Forma os professores do futuro.' },
            { icon: 'fa-brain', text: 'Estuda metodologias ativas de ensino.' },
            { icon: 'fa-school', text: 'Transforma a realidade da sala de aula.' },
            { icon: 'fa-book', text: 'Foco total em didática e inclusão.' },
            { icon: 'fa-hands-holding-child', text: 'Impacta diretamente a educação básica.' }
        ],
        negocios: [
            { icon: 'fa-chart-line', text: 'Otimiza processos e gerencia recursos.' },
            { icon: 'fa-handshake', text: 'Foco em gestão, economia e inovação.' },
            { icon: 'fa-sitemap', text: 'Lidera equipes e projetos complexos.' },
            { icon: 'fa-lightbulb', text: 'Empreendedorismo na veia.' },
            { icon: 'fa-earth-americas', text: 'Visão global e estratégica de mercado.' }
        ]
    };

    const filterBtns = document.querySelectorAll('.filter-btn');
    const flowItems = document.querySelectorAll('.flow-item');
    const titleCurso = document.getElementById('curso-titulo');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove classe ativa de todos e coloca no clicado
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const eixo = e.target.getAttribute('data-eixo');
            const data = courseData[eixo];
            
            // Muda o título
            titleCurso.textContent = `2. CONHEÇA SEU CURSO: EIXO DE ${e.target.textContent.toUpperCase()}`;
            
            // Animação de esmaecer (fade) para trocar o texto/ícone
            flowItems.forEach((item, index) => {
                item.style.opacity = 0;
                
                setTimeout(() => {
                    const iconEl = item.querySelector('.icon');
                    const textEl = item.querySelector('p');
                    
                    // Troca os dados
                    iconEl.className = `fa-solid ${data[index].icon} icon`;
                    textEl.textContent = data[index].text;
                    
                    item.style.opacity = 1;
                }, 300);
            });
        });
    });