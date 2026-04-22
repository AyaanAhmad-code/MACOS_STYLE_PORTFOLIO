import React, { useMemo } from "react";
import Terminal from "react-console-emulator";
import MacWindow from "./MacWindow";
import "./Cli.scss";

const Cli = ({ windowName, windowsState, setWindowsState, minimizedWindows, setMinimizedWindows }) => {
    
    // Memoize the commands object so the emulator doesn't re-register strings on React.StrictMode renders
    const commands = useMemo(() => {
        const cmdMap = {
            about: {
                description: 'About me',
                usage: 'about',
                fn: () => 'I am a MERN stack developer passionate about building scalable web applications, RESTful APIs, and solving complex computational problems.'
            },
            skills: {
                description: 'List technical skills',
                usage: 'skills',
                fn: () => `Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap\nBackend: Node.js, Express.js, REST APIs, JWT, GenAI APIs\nDatabases: MongoDB, Mongoose, Aggregation, Indexing\nTools: Git, GitHub, Postman, Vercel`
            },
            projects: {
                description: 'View my projects',
                usage: 'projects',
                fn: () => `1. macOS-Style Personal Portfolio - React + Vite\n2. Moodify: AI Emotion-Based Music Player - MERN + MediaPipe\n3. ZenTask Productivity Dashboard\n4. Inventory Management System\n5. Kanban Board & Image Editor\nType 'open github' to see more.`
            },
            experience: {
                description: 'Display education and certifications',
                usage: 'experience',
                fn: () => `Education:\n  - Bachelor of Computer Application (B.C.A.) @ Integral University, Lucknow\n  - Graduated: May 2025 | CGPA: 9.8 / 10.0\n\nCertifications:\n  - Introduction to Generative AI by Google Cloud (Dec 2024)`
            },
            contact: {
                description: 'Get contact information',
                usage: 'contact',
                fn: () => `Email: ayaanah287@gmail.com\nLinkedIn: linkedin.com/in/AyaanAhmad287\nGitHub: github.com/AyaanAhmad-code`
            },
            github: {
                description: 'Open GitHub profile',
                usage: 'github',
                fn: () => {
                    window.open('https://github.com/ayaanah287', '_blank');
                    return 'Opening GitHub profile in a new tab...';
                }
            },
            open: {
                description: 'Open a macOS app window (github, note, resume, spotify, finder)',
                usage: 'open <app_name>',
                fn: (...args) => {
                    const appName = args[0]?.toLowerCase();
                    const validApps = ['github', 'note', 'resume', 'spotify', 'finder', 'cli'];
                    if (validApps.includes(appName)) {
                        if (setWindowsState) setWindowsState(s => ({ ...s, [appName]: true }));
                        if (setMinimizedWindows) setMinimizedWindows(prev => prev.filter(w => w !== appName));
                        return `🚀 Opening ${appName}...`;
                    }
                    return `Application not found: '${appName || ''}'. Available apps: ${validApps.join(', ')}`;
                }
            },
            date: {
                description: 'Print current date and time',
                usage: 'date',
                fn: () => new Date().toLocaleString()
            },
            fetch: {
                description: 'Fetch a random developer joke from an external API',
                usage: 'fetch joke',
                fn: async () => {
                    try {
                        const res = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
                        const data = await res.json();
                        return `🌐 ${data.joke}`;
                    } catch (e) {
                        return 'Error: Failed to fetch the joke. Network anomaly detected.';
                    }
                }
            },
            cat: {
                description: 'Read the contents of a file',
                usage: 'cat <filename>',
                fn: (...args) => {
                    const file = args[0];
                    if(file === 'resume.txt') return 'Downloading resume to current directory...\nContent: [Encoded Binary]';
                    if(file === 'note.txt') return 'Profile Details:\nAuthor: Ayaan Ahmad\nStatus: Open to Opportunities\nLoading Assets... [||||||||||] 100%\nReady.';
                    return `cat: ${file || 'undefined'}: No such file or directory. Try 'cat note.txt'`;
                }
            },
            ping: {
                description: 'Send ICMP ECHO_REQUEST to network hosts',
                usage: 'ping <host>',
                fn: (...args) => {
                    const host = args[0] || 'localhost';
                    return `PING ${host} (192.168.1.1): 56 data bytes\n64 bytes from ${host}: icmp_seq=1 ttl=115 time=10.4 ms\n64 bytes from ${host}: icmp_seq=2 ttl=115 time=12.2 ms\n64 bytes from ${host}: icmp_seq=3 ttl=115 time=9.8 ms\n\n--- ${host} ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss`;
                }
            },
            whoami: {
                description: 'Print current user',
                usage: 'whoami',
                fn: () => 'ayaanahmad'
            },
            sudo: {
                description: 'Execute command as superuser',
                usage: 'sudo <command>',
                fn: () => 'ayaanahmad is not in the sudoers file. This incident will be reported to Apple.'
            },
            pwd: {
                description: 'Print working directory',
                usage: 'pwd',
                fn: () => '/Users/ayaanahmad/Desktop/MACOS_STYLE_PORTFOLIO'
            },
            ls: {
                description: 'List directory contents',
                usage: 'ls',
                fn: () => 'Desktop   Documents   Downloads   src   public   assets   .gitignore   package.json   README.md   note.txt'
            },
            calc: {
                description: 'Evaluate simple math (e.g. calc 2 + 2)',
                usage: 'calc <expression>',
                fn: (...args) => {
                    const expr = args.join(' ');
                    if (!expr) return 'Error: missing expression';
                    try {
                        const result = new Function('return (' + expr + ')')();
                        return `${expr} = ${result}`;
                    } catch(e) {
                        return 'Error evaluating expression. Make sure your math string is valid.';
                    }
                }
            },
            weather: {
                description: 'Get current weather',
                usage: 'weather',
                fn: () => '🌡️ City: Lucknow | Temp: 28°C | Condition: Clear Sky | Humidity: 60%'
            },
            echo: {
                description: 'Echo a passed string',
                usage: 'echo <string>',
                fn: (...args) => args.join(' ')
            }
        };

        // Custom help command to fix duplicate array bugs and fully customize layout
        cmdMap.help = {
            description: 'Show a list of available commands',
            usage: 'help',
            fn: () => {
                let helpStr = "Available commands:\n";
                Object.keys(cmdMap).forEach(key => {
                    helpStr += `  ${key.padEnd(12)} - ${cmdMap[key].description}\n`;
                });
                return helpStr;
            }
        }

        return cmdMap;

    }, [setWindowsState, setMinimizedWindows]);

    const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to My Portfolio CLI!       ║
╚════════════════════════════════════════╝

Hello! 👋 Welcome to my interactive portfolio terminal.

Type 'help' to see all available commands, or try:
  • projects  - Check out my work
  • open      - Open native macOS apps (e.g., 'open github' or 'open finder')
  • get       - Fetch dynamic internet content (e.g., 'fetch joke')
  • cat       - Read a file natively (e.g., 'cat note.txt')
  • ping      - Safely ping server architecture (e.g., 'ping discord.com')

Happy exploring! 🚀
`

  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      minimizedWindows={minimizedWindows}
      setMinimizedWindows={setMinimizedWindows}
      title="Terminal — ayaanahmad"
    >
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel={"ayaanahmad:~$"}
          promptLabelStyle={{ color: "#00ff00" }}
          noDefaults={true}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;
