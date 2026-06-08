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

// Simple chatbot responses based on keywords
const botResponses = {
    "hello": "Hi there! How can I help you learn more about Pratik?",
    "hi": "Hello! Ask me about Pratik's skills, projects, or education.",
    "skills": "Pratik is skilled in Java, MySQL, HTML, CSS, JavaScript, and Apache Web Server. He is also strong in problem-solving and communication.",
    "projects": "Pratik has worked on an E-Commerce Website, Sahyadri Treks, and ConnectU. Which one would you like to know more about?",
    "education": "Pratik is currently pursuing his B.Tech in Computer Science at Sharad Institute Of Technology.",
    "experience": "He gained hands-on experience as a Web Developer Intern at TecSpeak IT Solutions in Sangli.",
    "contact": "You can reach Pratik at pratikjadhav9302@gmail.com or call 8600729302.",
    "default": "I'm a simple bot. Try asking about Pratik's 'skills', 'projects', 'experience', or 'education'."
};

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex gap-2 text-sm max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`;
    
    if (isUser) {
        messageDiv.innerHTML = `
            <div class="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                ${message}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white"><i class="fas fa-robot"></i></div>
            <div class="bg-white dark:bg-card p-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none shadow-sm">
                ${message}
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    addMessage(userMessage, true);
    chatInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase();
        let botReply = botResponses["default"];
        
        for (const key in botResponses) {
            if (lowerMessage.includes(key)) {
                botReply = botResponses[key];
                break;
            }
        }
        
        addMessage(botReply, false);
    }, 600);
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
