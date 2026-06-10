// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from("#home h2", { opacity: 0, y: 30, duration: 1, delay: 0.2 });
gsap.from("#home h1", { opacity: 0, y: 30, duration: 1, delay: 0.4 });
gsap.from("#home h3", { opacity: 0, y: 30, duration: 1, delay: 0.6 });
gsap.from("#home p", { opacity: 0, y: 30, duration: 1, delay: 0.8 });
gsap.from("#home .flex", { opacity: 0, y: 30, duration: 1, delay: 1, stagger: 0.2 });

// Scroll Animations
const revealElements = document.querySelectorAll(".gs-reveal");

revealElements.forEach((el) => {
  gsap.fromTo(el, 
    { autoAlpha: 0, y: 50 }, 
    { 
      duration: 1, 
      autoAlpha: 1, 
      y: 0, 
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
});

// Chatbot Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function toggleChatbot() {
    if (chatbotWindow.classList.contains('scale-0')) {
        chatbotWindow.classList.remove('hidden');
        setTimeout(() => {
            chatbotWindow.classList.remove('scale-0', 'opacity-0');
            chatbotWindow.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        chatbotWindow.classList.remove('scale-100', 'opacity-100');
        chatbotWindow.classList.add('scale-0', 'opacity-0');
        setTimeout(() => {
            chatbotWindow.classList.add('hidden');
        }, 300);
    }
}

chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

// Chatbot response data
const topicDetails = {
    skills: `💻 <b>Pratik's Skills</b><br><br>🔹 <b>Languages:</b> C, C++, Java, JavaScript, MySQL<br>🔹 <b>Web Dev:</b> HTML5, CSS3, React.js, Spring Boot, Apache<br>🔹 <b>Soft Skills:</b> Problem Solving, Communication, Logical Thinking`,

    education: `🎓 <b>Pratik's Education</b><br><br>📌 <b>B.Tech CSE</b> — Sharad Institute Of Technology (2022–2026) | CGPA: 7.40<br>📌 <b>HSC</b> — Shantiniketan Vidhyamandir, Sangli (2022) | 76.16%<br>📌 <b>SSC</b> — Aanand Gurukul, Chikurde (2020) | 91.0%`,

    contact: `📬 <b>Get in Touch</b><br><br>📧 <b>Email:</b> pratikjadhav9302@gmail.com<br>📞 <b>Phone:</b> 8600729302<br>🐙 <b>GitHub:</b> github.com/pratikjadhav7<br>💼 <b>LinkedIn:</b> linkedin.com/in/pratik-jadhav-393772370`,

    certifications: `🏅 <b>Certifications</b><br><br>☁️ <b>AWS Academy Graduate</b> — Cloud Architecting (60-hour course)<br>🔐 <b>NPTEL Elite</b> — Cryptography & Network Security, IIT KGP | 70%<br>🐍 <b>NPTEL Elite</b> — The Joy of Computing using Python, IIT Madras | 78%`,

    projects: `🚀 <b>Featured Projects</b><br><br>Which project would you like to know about?`,
};

const experienceDetails = {
    nexanova: `🚀 <b>Application Developer Intern — Nexanova Protech</b><br>Developed and maintained full-stack applications using modern web technologies. Engineered backend systems, integrated database solutions, and applied strong DSA foundations.<br><br>🛠️ <i>C++ & Java (DSA), HTML/CSS/JS, React.js, Spring Boot, MySQL</i>`,
    tecspeak: `💻 <b>Web Developer Intern — TecSpeak IT Solutions, Sangli</b><br>Designed and developed responsive webpages. Collaborated with the development team to implement interactive features and optimise website performance with a focus on user-friendly interfaces.`
};

const projectDetails = {
    ecommerce: `🛒 <b>E-Commerce Website</b><br>A responsive books commerce website with product search, user authentication, and performance optimizations for mobile & desktop.<br><br>🛠️ <i>HTML, CSS, JavaScript</i>`,
    sahyadri: `🏔️ <b>Sahyadri Treks</b><br>A trekking platform with information on destinations, nearby places, and restaurant suggestions for trekkers.<br><br>🛠️ <i>Bootstrap, MS Excel Data</i>`,
    connectu: `🤝 <b>ConnectU</b><br>A networking platform connecting alumni and students for mentorship, career guidance, and job opportunities to support long-term community building.<br><br>🛠️ <i>Responsive UI, Community Platform</i>`
};

const MAIN_MENU_REPLIES = [
    { label: '💻 Skills',          value: 'skills' },
    { label: '🚀 Projects',        value: 'projects' },
    { label: '🏢 Experience',      value: 'experience' },
    { label: '🎓 Education',       value: 'education' },
    { label: '🏅 Certifications',  value: 'certifications' },
    { label: '📬 Contact',         value: 'contact' },
];

function showMainMenu() {
    addMessage(
        `Hi! 👋 I'm Pratik's virtual assistant.<br>What would you like to know about him?`,
        false,
        MAIN_MENU_REPLIES
    );
}

let menuShown = false;

function addMessage(message, isUser = false, quickReplies = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex gap-2 text-sm max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`;

    if (isUser) {
        messageDiv.innerHTML = `
            <div class="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                ${message}
            </div>
        `;
    } else {
        let quickReplyHTML = '';
        if (quickReplies.length > 0) {
            quickReplyHTML = `<div class="flex flex-wrap gap-2 mt-3">` +
                quickReplies.map(qr => `<button class="quick-reply-btn px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-medium transition-colors cursor-pointer" data-reply="${qr.value}">${qr.label}</button>`).join('') +
                `</div>`;
        }
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white"><i class="fas fa-robot"></i></div>
            <div class="bg-white dark:bg-card p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm">
                ${message}${quickReplyHTML}
            </div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Attach quick reply click handlers
    messageDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const replyText = btn.getAttribute('data-reply');
            btn.closest('.flex.flex-wrap').remove(); // remove quick reply buttons after click
            handleUserInput(replyText);
        });
    });
}

function handleUserInput(userMessage) {
    addMessage(userMessage, true);

    setTimeout(() => {
        const lower = userMessage.toLowerCase();

        // Show main menu
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('menu') || lower.includes('help') || lower.includes('start') || lower.includes('hey')) {
            addMessage(
                `Great to meet you! 😊 Here's what you can explore about Pratik:`,
                false,
                MAIN_MENU_REPLIES
            );
            return;
        }

        // Skills
        if (lower.includes('skill') || lower.includes('tech') || lower.includes('language') || lower.includes('stack')) {
            addMessage(topicDetails.skills);
            return;
        }

        // Education
        if (lower.includes('education') || lower.includes('college') || lower.includes('degree') || lower.includes('study') || lower.includes('academic') || lower.includes('cgpa') || lower.includes('btech') || lower.includes('b.tech')) {
            addMessage(topicDetails.education);
            return;
        }

        // Certifications
        if (lower.includes('certif') || lower.includes('aws') || lower.includes('nptel') || lower.includes('certificate')) {
            addMessage(topicDetails.certifications);
            return;
        }

        // Contact
        if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('reach') || lower.includes('linkedin') || lower.includes('github')) {
            addMessage(topicDetails.contact);
            return;
        }

        // Specific experience detail requests
        if (lower.includes('nexanova')) {
            addMessage(experienceDetails.nexanova);
            return;
        }
        if (lower.includes('tecspeak') || lower.includes('tec speak') || lower.includes('techspeak')) {
            addMessage(experienceDetails.tecspeak);
            return;
        }

        // General experience / internship query → show both + quick reply options
        if (lower.includes('experience') || lower.includes('internship') || lower.includes('work')) {
            addMessage(
                `Pratik has <b>2 internship experiences</b>! Which one would you like to know more about?`,
                false,
                [
                    { label: '🚀 Nexanova Protech', value: 'Nexanova Protech' },
                    { label: '💻 TecSpeak IT Solutions', value: 'TecSpeak IT Solutions' },
                    { label: '📋 Show Both', value: 'Show both experiences' }
                ]
            );
            return;
        }

        // Show both experiences
        if (lower.includes('both') || lower.includes('all experience')) {
            addMessage(`Here are Pratik's two internship experiences:<br><br>1️⃣ ${experienceDetails.nexanova}<br><br>2️⃣ ${experienceDetails.tecspeak}`);
            return;
        }

        // Project details
        if (lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('book')) {
            addMessage(projectDetails.ecommerce);
            return;
        }
        if (lower.includes('sahyadri') || lower.includes('trek')) {
            addMessage(projectDetails.sahyadri);
            return;
        }
        if (lower.includes('connectu') || lower.includes('connect u') || lower.includes('alumni')) {
            addMessage(projectDetails.connectu);
            return;
        }

        // General projects query
        if (lower.includes('project')) {
            addMessage(
                topicDetails.projects,
                false,
                [
                    { label: '🛒 E-Commerce Website', value: 'E-Commerce Website' },
                    { label: '🏔️ Sahyadri Treks',     value: 'Sahyadri Treks' },
                    { label: '🤝 ConnectU',            value: 'ConnectU' }
                ]
            );
            return;
        }

        // Default — show menu
        addMessage(
            `I'm not sure about that, but here's what I can help you with:`,
            false,
            MAIN_MENU_REPLIES
        );
    }, 600);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = '';
    handleUserInput(userMessage);
});

// Show main menu with quick-reply buttons when chatbot opens for the first time
chatbotToggle.addEventListener('click', () => {
    if (!menuShown) {
        menuShown = true;
        setTimeout(() => {
            // Replace the static welcome message quick replies
            const existing = chatMessages.querySelector('.flex.flex-wrap');
            if (!existing) {
                addMessage(
                    `What would you like to know about Pratik?`,
                    false,
                    MAIN_MENU_REPLIES
                );
            }
        }, 400);
    }
});

// Sticky Navbar Background
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/80', 'dark:bg-darker/80', 'shadow-md');
    } else {
        navbar.classList.remove('bg-white/80', 'dark:bg-darker/80', 'shadow-md');
    }
});
