import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Briefcase, Code, Mail, MessageCircle, Send, X, Linkedin, Github, Download, Menu, ArrowRight, Bot, User, Sparkles, Loader2 } from 'lucide-react';

// --- Shared Resume Context for Gemini API ---
const resumeContext = `
    Vishwas KV is a Software Engineer at Wells Fargo in Bangalore. Contact him at vishwaskv0601@gmail.com, or find him on LinkedIn at linkedin.com/in/vishwaskv and GitHub at github.com/vishwaskv362.

    Technical Skills:
    - Programming: Python, JavaScript
    - Frameworks: Django, Django REST Framework, FastAPI, Flask
    - Tools: Git, GitHub, PyCharm, VS-Code, Postman
    - Databases: SQL (Microsoft SQL Server, Oracle DB, PostgreSQL), MongoDB, Redis
    - DevOps: Terraform, Docker, Kubernetes, Jenkins CICD, Helm
    - Cloud: Google Cloud Platform (GCP), Microsoft Azure
    - Big Data: PySpark, Kafka, Hadoop, Airflow, DuckDB

    Work Experience:
    - Software Engineer at Wells Fargo (May 2022 - Present): Developed a Django model registry, designed REST APIs, built a Kafka-based notification system, improved code quality (90-95% SonarQube coverage), built PySpark data pipelines, automated notebook creation, onboarded APIs to Apigee, and contributed to a FastAPI-based TaaS platform (ValOps) using gRPC, Redis, and Kafka. Pioneered containerization with Docker, OCP, and GitHub Actions. Developed Airflow DAGs.
    - Azure DevOps Intern at Hitachi Vantara (Jan 2022 - Apr 2022): Set up CI/CD pipelines, created Docker containers, and deployed to Azure Kubernetes Service (AKS).

    Education:
    - Bachelor of Engineering in Information Science from Global Academy of Technology, Bangalore (CGPA: 9.0).
    - Pre-University from Soundarya Composite PU College, Bangalore (Percentage: 94.16%).

    Projects:
    - FastAPI E-Commerce Backend: Built with FastAPI, JWT, Docker, PostgreSQL.
    - Resume Matching with Document AI & Gemini: Django REST API using Google Cloud Document AI and Vertex AI (Gemini).
    
    Certificates & Achievements:
    - Google Cloud Certified Associate Cloud Engineer.
    - Docker Essentials.
    - Spotlight Achievement at Wells Fargo for Apigee integration, improving API response times by 50%.
`;

// Main App Component
export default function App() {
    const [theme, setTheme] = useState('dark');
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const sections = {
        home: useRef(null),
        about: useRef(null),
        projects: useRef(null),
        resume: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        Object.values(sections).forEach(sectionRef => {
            if (sectionRef.current) {
                observer.observe(sectionRef.current);
            }
        });

        return () => {
            Object.values(sections).forEach(sectionRef => {
                if (sectionRef.current) {
                    observer.unobserve(sectionRef.current);
                }
            });
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const scrollToSection = (id) => {
        sections[id].current.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };
    
    const resumeUrl = 'K_V_Vishwas___2025___Resume.pdf';
    const profilePicUrl = 'http://googleusercontent.com/file_content/0';

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans leading-normal tracking-tight transition-colors duration-300">
            <Header 
                theme={theme} 
                toggleTheme={toggleTheme} 
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            <main className="pt-16">
                <Hero ref={sections.home} id="home" scrollToContact={() => scrollToSection('contact')} profilePicUrl={profilePicUrl} />
                <About ref={sections.about} id="about" />
                <Projects ref={sections.projects} id="projects" />
                <Resume ref={sections.resume} id="resume" resumeUrl={resumeUrl} />
                <Contact ref={sections.contact} id="contact" />
            </main>
            <Footer />
            <ChatbotButton onClick={() => setIsChatOpen(true)} />
            {isChatOpen && <Chatbot closeChat={() => setIsChatOpen(false)} />}
        </div>
    );
}

// --- COMPONENTS ---

// Header Component
const Header = ({ theme, toggleTheme, activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
    const navItems = ['Home', 'About', 'Projects', 'Resume', 'Contact'];
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        <span className="ml-2 text-xl font-bold">Vishwas KV</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map(item => (
                            <button 
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    activeSection === item.toLowerCase()
                                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                    <div className="flex items-center">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <button 
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    activeSection === item.toLowerCase()
                                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

// Hero Section
const Hero = React.forwardRef(({ id, scrollToContact, profilePicUrl }, ref) => (
    <section ref={ref} id={id} className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <img 
                src={profilePicUrl}
                alt="Vishwas KV" 
                className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/160x160/6366f1/ffffff?text=VKV'; }}
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="block">Hi, I'm </span>
                <span className="block text-indigo-600 dark:text-indigo-400">Vishwas KV</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                A passionate Software Engineer crafting robust and scalable solutions.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <button onClick={scrollToContact} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg transition-transform transform hover:scale-105">
                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a href="https://github.com/vishwaskv362" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg transition-transform transform hover:scale-105">
                    <Github className="mr-2 h-5 w-5" /> GitHub
                </a>
            </div>
        </div>
    </section>
));

// About Section
const About = React.forwardRef(({ id }, ref) => (
    <section ref={ref} id={id} className="py-20 sm:py-28 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="About Me" subtitle="A brief introduction to my professional journey." />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        I am a Software Engineer at Wells Fargo with a proven track record of developing and managing high-impact applications. My expertise lies in Python, Django, FastAPI, and various cloud technologies including GCP and Azure.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        I thrive in microservices architectures, building REST APIs, and automating complex processes. From designing real-time notification systems with Kafka to containerizing applications with Docker and Kubernetes, I'm passionate about creating efficient, scalable, and maintainable software. I'm also a Google Cloud Certified Associate Cloud Engineer, always eager to learn and apply new technologies to solve challenging problems.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Python', 'JavaScript', 'Django', 'FastAPI', 'Docker', 'Kubernetes', 'GCP', 'Azure', 'PySpark', 'Kafka'].map(skill => (
                            <span key={skill} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-1">
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <ul className="space-y-4">
                            <li><strong>Name:</strong> Vishwas KV</li>
                            <li><strong>Location:</strong> Bangalore, India</li>
                            <li><strong>Email:</strong> vishwaskv0601@gmail.com</li>
                            <li><strong>Role:</strong> Software Engineer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
));

// Projects Section
const Projects = React.forwardRef(({ id }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const projects = [
        {
            title: "FastAPI powered E-Commerce Backend",
            description: "An e-commerce backend with product management, JWT authentication, and wishlist features. Containerized with Docker for efficient deployment and scalability.",
            stack: ["FastAPI", "JWT", "Docker", "PostgreSQL"],
            link: "https://github.com/vishwaskv362",
            demo: "#"
        },
        {
            title: "Resume Matching with Document AI & Gemini",
            description: "A Django REST API to match resumes with job descriptions using Google Cloud's Document AI for OCR and Gemini AI for analysis. Deployed on Google Cloud Run.",
            stack: ["Django", "Google Cloud", "Vertex AI", "Docker"],
            link: "https://github.com/vishwaskv362",
            demo: "#"
        },
        {
            title: "Model Validation Platform (ValOps)",
            description: "A FastAPI-based platform enabling Testing as a Service (TaaS) for Model Risk Management. Features gRPC, Redis queues, and Kafka for asynchronous validation.",
            stack: ["FastAPI", "gRPC", "Redis", "Kafka", "OCP"],
            link: "#",
            demo: "#"
        }
    ];

    return (
        <section ref={ref} id={id} className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Projects" subtitle="A selection of my recent work." />
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg transition-transform transform hover:scale-105"
                    >
                        <Sparkles className="mr-2 h-5 w-5" /> ✨ Suggest a Project Idea
                    </button>
                </div>
            </div>
            {isModalOpen && <ProjectIdeaModal closeModal={() => setIsModalOpen(false)} />}
        </section>
    );
});

// Project Card Component
const ProjectCard = ({ title, description, stack, link, demo }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {stack.map(tech => (
                    <span key={tech} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{tech}</span>
                ))}
            </div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
            <a href={link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ${link === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Github className="w-4 h-4 mr-1" /> GitHub
            </a>
            <a href={demo} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ${demo === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Code className="w-4 h-4 mr-1" /> Demo
            </a>
        </div>
    </div>
);

// Resume Section
const Resume = React.forwardRef(({ id, resumeUrl }, ref) => (
    <section ref={ref} id={id} className="py-20 sm:py-28 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle title="My Resume" subtitle="Check out my professional background." />
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                You can view or download my resume to get a more detailed look at my skills, experience, and qualifications.
            </p>
            <div className="mt-8">
                <a href={resumeUrl} download="Vishwas_KV_Resume.pdf" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg transition-transform transform hover:scale-105">
                    <Download className="mr-3 h-6 w-6" /> Download Resume
                </a>
            </div>
        </div>
    </section>
));

// Contact Section
const Contact = React.forwardRef(({ id }, ref) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');
        // Mock form submission
        setTimeout(() => {
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1000);
    };

    return (
        <section ref={ref} id={id} className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle title="Contact Me" subtitle="Let's connect and build something amazing together." />
                <div className="mt-12 max-w-lg mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex justify-center space-x-6">
                            <a href="https://linkedin.com/in/vishwaskv" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <Linkedin className="h-8 w-8" />
                            </a>
                            <a href="https://github.com/vishwaskv362" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <Github className="h-8 w-8" />
                            </a>
                            <a href="mailto:vishwaskv0601@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <Mail className="h-8 w-8" />
                            </a>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" placeholder="Your Email" />
                            </div>
                            <div className="relative">
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" placeholder="Your Message"></textarea>
                                <button type="button" onClick={() => setIsModalOpen(true)} className="absolute bottom-2 right-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800">
                                    <Sparkles className="h-4 w-4 mr-1" /> ✨ Draft with AI
                                </button>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Send Message
                                </button>
                            </div>
                            {status && <p className="text-center text-sm text-gray-500 dark:text-gray-400">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
            {isModalOpen && <MessageDraftModal closeModal={() => setIsModalOpen(false)} updateMessage={(msg) => setFormData({...formData, message: msg})} />}
        </section>
    );
});

// Footer Component
const Footer = () => (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Vishwas KV. All Rights Reserved.</p>
            <p className="mt-1">Built with React, Tailwind CSS, and lots of ❤️.</p>
        </div>
    </footer>
);

// Section Title Component
const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-600 dark:text-indigo-400">{title}</h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            {subtitle}
        </p>
    </div>
);

// --- AI & Chatbot Components ---

// Chatbot Button
const ChatbotButton = ({ onClick }) => (
    <button onClick={onClick} className="fixed bottom-6 right-6 bg-indigo-600 dark:bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-transform transform hover:scale-110">
        <MessageCircle className="h-8 w-8" />
    </button>
);

// Main Chatbot Window
const Chatbot = ({ closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([{
            text: "Hello! I'm Vishwas's AI assistant. Ask me anything about his skills, experience, or projects.",
            sender: 'bot'
        }]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const prompt = `Based on the following resume information, answer the user's question. If the question is unrelated to the resume, politely say you can only answer questions about Vishwas's professional background.
            
            Resume Information:
            ${resumeContext}
            
            User Question: ${input}
            
            Answer:`;
            
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY || ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            
            let botResponse = "I'm sorry, I couldn't process that. Please try again.";
            if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                botResponse = result.candidates[0].content.parts[0].text;
            }
            
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 h-full w-full sm:h-[600px] sm:w-96 bg-white dark:bg-gray-800 rounded-none sm:rounded-lg shadow-2xl flex flex-col z-50">
            <header className="flex items-center justify-between p-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-t-none sm:rounded-t-lg">
                <div className="flex items-center">
                    <Bot className="h-6 w-6 mr-2" />
                    <h3 className="font-bold">AI Assistant</h3>
                </div>
                <button onClick={closeChat} className="p-1 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600">
                    <X className="h-5 w-5" />
                </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-white" /></div>}
                            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-gray-800 dark:text-gray-200" /></div>}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-white" /></div>
                            <div className="px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center space-x-1">
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask a question..."
                        className="flex-1 bg-transparent p-3 border-none focus:ring-0 text-sm"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 rounded-full bg-indigo-500 text-white disabled:bg-indigo-300 disabled:cursor-not-allowed dark:disabled:bg-indigo-800 transition-colors">
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Project Idea Generator Modal
const ProjectIdeaModal = ({ closeModal }) => {
    const [idea, setIdea] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateIdea = async () => {
        setIsLoading(true);
        setError(null);
        setIdea(null);
        try {
            const skills = "Python, JavaScript, Django, FastAPI, Docker, Kubernetes, GCP, Azure, PySpark, Kafka, SQL, MongoDB, Redis";
            const prompt = `Based on the following skills of a software engineer: ${skills}, generate a unique and interesting project idea for their portfolio. The idea should be modern and practical. Provide a response in JSON format with the following keys: "title" (string), "description" (string, max 75 words), and "stack" (array of strings).`;

            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            };
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            setIdea(JSON.parse(text));

        } catch (e) {
            console.error("Error generating project idea:", e);
            setError("Sorry, I couldn't come up with an idea right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateIdea();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6 relative">
                <button onClick={closeModal} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <X className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center"><Sparkles className="mr-2 h-5 w-5" /> AI Project Idea</h3>
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Generating a brilliant idea...</p>
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {idea && (
                    <div className="animate-fade-in">
                        <h4 className="font-bold text-xl mb-2">{idea.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{idea.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {idea.stack.map(tech => (
                                <span key={tech} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{tech}</span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-6 text-right">
                    <button onClick={generateIdea} disabled={isLoading} className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-md hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800 disabled:opacity-50">
                        {isLoading ? 'Generating...' : '✨ Regenerate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Message Draft Generator Modal
const MessageDraftModal = ({ closeModal, updateMessage }) => {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateMessage = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const prompt = `A person wants to contact Vishwas KV, a Software Engineer. Their purpose is: "${topic}". Draft a professional, friendly, and concise message (under 60 words) from them to Vishwas.`;

            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);

            const result = await response.json();
            const message = result.candidates[0].content.parts[0].text;
            updateMessage(message);
            closeModal();

        } catch (e) {
            console.error("Error generating message:", e);
            setError("Sorry, I couldn't draft a message right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-sm w-full p-6 relative">
                <button onClick={closeModal} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <X className="h-5 w-5" />
                </button>
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center"><Sparkles className="mr-2 h-5 w-5" /> Draft a Message</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">What is the purpose of your message? (e.g., "Job opportunity", "Collaboration on a project")</p>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic..."
                    className="w-full shadow-sm py-2 px-3 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={closeModal} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                    <button onClick={generateMessage} disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center">
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};
