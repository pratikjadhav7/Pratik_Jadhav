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
const botResponses = {
    "hello": "Hi there! How can I help you learn more about Pratik?",
    "hi": "Hello! Ask me about Pratik's skills, projects, experience, or education.",
    "skills": "Pratik is skilled in Java, C++, MySQL, HTML, CSS, JavaScript, React.js, and Spring Boot. He is also strong in problem-solving and communication.",
    "projects": "Pratik has worked on an <b>E-Commerce Website</b>, <b>Sahyadri Treks</b>, and <b>ConnectU</b>. Which one would you like to know more about?",
    "education": "Pratik is currently pursuing his B.Tech in Computer Science & Engineering at <b>Sharad Institute Of Technology</b> (CGPA: 7.40). He completed HSC (76.16%) and SSC (91.0%) from schools in Sangli.",
    "contact": "You can reach Pratik at 📧 <b>pratikjadhav9302@gmail.com</b> or call 📞 <b>8600729302</b>.",
    "default": "I'm Pratik's assistant! Try asking about his <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>internship</b>, or <b>education</b>."
};

const experienceDetails = {
    nexanova: `<b>Application Developer Intern — Nexanova Protech</b><br>Developed and maintained full-stack applications using modern web technologies. Engineered backend systems, integrated database solutions, and applied strong DSA foundations.<br><br>🛠️ <i>C++ & Java (DSA), HTML/CSS/JS, React.js, Spring Boot, MySQL</i>`,
    tecspeak: `<b>Web Developer Intern — TecSpeak IT Solutions, Sangli</b><br>Designed and developed responsive webpages. Collaborated with the development team to implement interactive features and optimise website performance with a focus on user-friendly interfaces.`
};

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

        // Keyword-based fallback
        let botReply = botResponses["default"];
        for (const key in botResponses) {
            if (lower.includes(key)) {
                botReply = botResponses[key];
                break;
            }
        }
        addMessage(botReply);
    }, 600);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = '';
    handleUserInput(userMessage);
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
