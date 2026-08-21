"use strict";

/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}


/* =========================================
   ROLAGEM SUAVE
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"
            });
        }
    });
});


/* =========================================
   ANIMAÇÕES AO ENTRAR NA TELA
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================
   ESTRUTURAS DO OLHO
========================================= */

const structureData = {
    cornea: {
        title: "Córnea",
        description:
            "A córnea é uma camada transparente localizada na parte da frente do olho. Ela protege o olho e ajuda a desviar e focalizar a luz. Esse desvio da luz está relacionado ao fenômeno da refração."
    },

    pupila: {
        title: "Pupila",
        description:
            "A pupila é uma abertura por onde a luz entra no olho. Ela não é uma estrutura sólida. Seu tamanho pode variar de acordo com a quantidade de luz presente no ambiente."
    },

    iris: {
        title: "Íris",
        description:
            "A íris é a parte colorida do olho e controla o tamanho da pupila. Em ambientes muito iluminados, a pupila diminui. Em ambientes escuros, ela aumenta."
    },

    cristalino: {
        title: "Cristalino",
        description:
            "O cristalino funciona como uma lente. Ele consegue alterar sua curvatura para ajudar a manter a imagem focalizada na retina."
    },

    vitreo: {
        title: "Humor vítreo",
        description:
            "O humor vítreo é uma substância transparente que ocupa grande parte do interior do olho e ajuda a manter seu formato."
    },

    retina: {
        title: "Retina",
        description:
            "A retina fica na parte posterior do olho. Ela contém células especializadas chamadas fotorreceptores, que detectam a luz."
    },

    nervo: {
        title: "Nervo óptico",
        description:
            "O nervo óptico transmite as informações visuais da retina para o cérebro."
    }
};

const structureButtons = document.querySelectorAll(".structure-button");
const structureTitle = document.getElementById("structure-title");
const structureDescription = document.getElementById("structure-description");

function showStructure(part) {
    const data = structureData[part];

    if (!data) {
        return;
    }

    structureTitle.textContent = data.title;
    structureDescription.textContent = data.description;

    structureButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.part === part
        );
    });
}

structureButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showStructure(button.dataset.part);
    });
});

document.querySelectorAll("[data-part]").forEach((element) => {
    if (!element.classList.contains("structure-button")) {
        element.addEventListener("click", () => {
            showStructure(element.dataset.part);
        });
    }
});


/* =========================================
   DEMONSTRAÇÃO DA PUPILA
========================================= */

const lightSlider = document.getElementById("light-slider");
const demoPupil = document.getElementById("demo-pupil");
const lightStatus = document.getElementById("light-status");

function updatePupil() {
    if (!lightSlider || !demoPupil || !lightStatus) {
        return;
    }

    const value = Number(lightSlider.value);

    /*
        Quanto maior a quantidade de luz,
        menor será a pupila.
    */

    const pupilSize = 75 - value * 0.55;

    demoPupil.style.width = `${pupilSize}%`;
    demoPupil.style.height = `${pupilSize}%`;

    if (value < 30) {
        lightStatus.textContent =
            "Pouca luz: a pupila aumenta para permitir a entrada de mais luz.";
    } else if (value > 70) {
        lightStatus.textContent =
            "Muita luz: a pupila diminui para controlar a entrada de luz.";
    } else {
        lightStatus.textContent =
            "Iluminação intermediária: a pupila apresenta um tamanho intermediário.";
    }
}

if (lightSlider) {
    lightSlider.addEventListener("input", updatePupil);
    updatePupil();
}


/* =========================================
   ACOMODAÇÃO DO CRISTALINO
========================================= */

const focusButtons = document.querySelectorAll(".focus-button");
const miniLens = document.getElementById("mini-lens");
const focusText = document.getElementById("focus-text");
const focusObject = document.getElementById("focus-object");

function updateFocus(type) {
    focusButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.focus === type
        );
    });

    if (!miniLens || !focusText || !focusObject) {
        return;
    }

    if (type === "near") {
        miniLens.style.width = "62px";
        miniLens.style.height = "118px";
        miniLens.style.left = "36%";

        focusObject.style.transform = "scale(1.25)";

        focusText.innerHTML = `
            <strong>Objeto próximo</strong>
            <span>O cristalino fica mais curvo para ajudar na focalização.</span>
        `;
    } else {
        miniLens.style.width = "45px";
        miniLens.style.height = "105px";
        miniLens.style.left = "38%";

        focusObject.style.transform = "scale(0.8)";

        focusText.innerHTML = `
            <strong>Objeto distante</strong>
            <span>O cristalino fica relativamente mais achatado.</span>
        `;
    }
}

focusButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateFocus(button.dataset.focus);
    });
});


/* =========================================
   CAMINHO DA LUZ
========================================= */

const pathCards = document.querySelectorAll(".path-card");

const pathObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                pathCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transform = "translateY(-5px)";

                        setTimeout(() => {
                            card.style.transform = "";
                        }, 350);
                    }, index * 180);
                });

                pathObserver.disconnect();
            }
        });
    },
    {
        threshold: 0.25
    }
);

const lightPath = document.querySelector(".light-path");

if (lightPath) {
    pathObserver.observe(lightPath);
}


/* =========================================
   IMAGEM INVERTIDA
========================================= */

const inversionDemo = document.querySelector(".inversion-demo");

if (inversionDemo) {
    const inversionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const objectArrow =
                        document.querySelector(".object-arrow");

                    const invertedArrow =
                        document.querySelector(".inverted-arrow");

                    if (objectArrow && invertedArrow) {
                        objectArrow.animate(
                            [
                                {
                                    transform: "translateY(0)"
                                },
                                {
                                    transform: "translateY(-8px)"
                                },
                                {
                                    transform: "translateY(0)"
                                }
                            ],
                            {
                                duration: 1200,
                                iterations: 2
                            }
                        );

                        setTimeout(() => {
                            invertedArrow.animate(
                                [
                                    {
                                        transform: "rotate(0deg)"
                                    },
                                    {
                                        transform: "rotate(8deg)"
                                    },
                                    {
                                        transform: "rotate(0deg)"
                                    }
                                ],
                                {
                                    duration: 1200,
                                    iterations: 2
                                }
                            );
                        }, 600);
                    }

                    inversionObserver.disconnect();
                }
            });
        },
        {
            threshold: 0.4
        }
    );

    inversionObserver.observe(inversionDemo);
}


/* =========================================
   RESUMO PROGRESSIVO
========================================= */

const summarySteps = document.querySelectorAll(".summary-step");

const summaryObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                summarySteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add("visible");
                    }, index * 100);
                });

                summaryObserver.disconnect();
            }
        });
    },
    {
        threshold: 0.15
    }
);

const summaryTimeline = document.querySelector(".summary-timeline");

if (summaryTimeline) {
    summaryObserver.observe(summaryTimeline);
}


/* =========================================
   QUIZ
========================================= */

const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");
const scoreNumber = document.getElementById("score-number");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

const correctAnswers = {
    q1: "b",
    q2: "c",
    q3: "a",
    q4: "b",
    q5: "c",
    q6: "b",
    q7: "a",
    q8: "a"
};

if (quizForm) {
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = 0;

        Object.entries(correctAnswers).forEach(
            ([question, correctAnswer]) => {
                const selected = quizForm.querySelector(
                    `input[name="${question}"]:checked`
                );

                if (selected && selected.value === correctAnswer) {
                    score++;
                }
            }
        );

        scoreNumber.textContent = score;

        if (score === 8) {
            resultTitle.textContent = "Excelente!";
            resultMessage.textContent =
                "Você acertou todas as questões e dominou o caminho da luz até o cérebro.";
        } else if (score >= 6) {
            resultTitle.textContent = "Muito bem!";
            resultMessage.textContent =
                "Você entendeu muito bem os principais conceitos de óptica e visão.";
        } else if (score >= 4) {
            resultTitle.textContent = "Bom começo!";
            resultMessage.textContent =
                "Você já entendeu vários conceitos. Vale revisar algumas partes do processo.";
        } else {
            resultTitle.textContent = "Hora de revisar!";
            resultMessage.textContent =
                "Não tem problema. Volte pelas seções e tente o quiz novamente.";
        }

        quizResult.classList.add("show");

        quizResult.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth",
            block: "center"
        });
    });
}


/* =========================================
   BOTÃO VOLTAR AO TOPO
========================================= */

const backTop = document.getElementById("back-top");

if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
                ? "auto"
                : "smooth"
        });
    });
}


/* =========================================
   ACESSIBILIDADE DO MENU PELO TECLADO
========================================= */

if (menuToggle) {
    menuToggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            menuToggle.click();
        }
    });
}


/* =========================================
   DESTAQUE DAS SEÇÕES NO MENU
========================================= */

const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav-menu a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                menuLinks.forEach((link) => {
                    const isCurrent =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.style.color = isCurrent
                        ? "#FFE08A"
                        : "";
                });
            }
        });
    },
    {
        threshold: 0.45
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});
