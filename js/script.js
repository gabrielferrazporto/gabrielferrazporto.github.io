// Elementos usados no menu e no cabeçalho.
const header = document.querySelector("#site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

// Abre o menu mobile.
function openMenu() {
    navigation.classList.add("is-open");
    header.classList.add("menu-is-open");
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Fechar menu de navegação");
}

// Fecha o menu mobile.
function closeMenu() {
    navigation.classList.remove("is-open");
    header.classList.remove("menu-is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
}

// Abre ou fecha o menu quando o botão é clicado.
menuButton.addEventListener("click", function () {
    if (navigation.classList.contains("is-open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Fecha o menu ao pressionar a tecla Escape.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Fecha o menu quando a tela volta para o tamanho desktop.
window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
        closeMenu();
    }
});

// Faz a rolagem até a seção clicada.
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const destination = link.getAttribute("href");

        // Impede que os links de projetos ainda sem URL recarreguem a página.
        if (destination === "#") {
            event.preventDefault();
            return;
        }

        // Mantém o comportamento acessível do link "Pular para o conteúdo".
        if (link.classList.contains("skip-link")) {
            return;
        }

        const section = document.querySelector(destination);

        if (section) {
            event.preventDefault();
            section.scrollIntoView();
            closeMenu();
        }
    });
});

// Muda o fundo do cabeçalho depois que a página começa a rolar.
function updateHeader() {
    if (window.scrollY > 16) {
        header.classList.add("is-scrolled");
    } else {
        header.classList.remove("is-scrolled");
    }
}

updateHeader();
window.addEventListener("scroll", updateHeader);

// Coloca o ano atual no rodapé.
const currentYear = document.querySelector("#current-year");
currentYear.textContent = new Date().getFullYear();

// Mostra os elementos com uma animação quando eles aparecem na tela.
const elementsToAnimate = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
    document.body.classList.add("animations-ready");

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("show");
            animationObserver.unobserve(entry.target);

            // Remove as classes ao terminar para não interferir nos hovers.
            entry.target.addEventListener("animationend", function () {
                entry.target.classList.remove("reveal", "show");
            }, { once: true });
        });
    });

    elementsToAnimate.forEach(function (element) {
        animationObserver.observe(element);
    });
}
