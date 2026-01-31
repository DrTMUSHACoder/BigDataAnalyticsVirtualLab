import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Package, Terminal, CheckCircle, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import './DockerSetup.css';

const DockerSetup = () => {
    const [copiedStep, setCopiedStep] = useState(null);

    const copyToClipboard = (text, stepId) => {
        navigator.clipboard.writeText(text);
        setCopiedStep(stepId);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    const dockerSteps = [
        {
            id: 1,
            title: "Install Docker Desktop",
            description: "Download and install Docker Desktop for your operating system",
            links: [
                { label: "Windows", url: "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" },
                { label: "Mac", url: "https://desktop.docker.com/mac/main/amd64/Docker.dmg" },
                { label: "Linux", url: "https://docs.docker.com/engine/install/ubuntu/" }
            ],
            commands: null
        },
        {
            id: 2,
            title: "Verify Docker Installation",
            description: "Open a terminal/command prompt and verify Docker is installed correctly",
            commands: ["docker --version", "docker ps"]
        },
        {
            id: 3,
            title: "Pull Hadoop Docker Image",
            description: "Download the pre-configured Hadoop Docker image (this includes HDFS, YARN, MapReduce, Pig, and Hive)",
            commands: ["docker pull sequenceiq/hadoop-docker:2.7.1"],
            note: "This may take 5-10 minutes depending on your internet speed (~2GB download)"
        },
        {
            id: 4,
            title: "Start Hadoop Container",
            description: "Launch the Hadoop container with all services",
            commands: ["docker run -it --name hadoop-lab -p 9870:50070 -p 8088:8088 -p 19888:19888 sequenceiq/hadoop-docker:2.7.1 /etc/bootstrap.sh -bash"],
            note: "This command starts Hadoop and opens a bash terminal inside the container"
        },
        {
            id: 5,
            title: "Verify Hadoop Services",
            description: "Check if Hadoop services are running (inside the container)",
            commands: ["jps"],
            expectedOutput: "You should see:\n• NameNode\n• DataNode\n• ResourceManager\n• NodeManager\n• SecondaryNameNode"
        },
        {
            id: 6,
            title: "Access Hadoop Web UIs",
            description: "Open these URLs in your browser to access Hadoop dashboards",
            links: [
                { label: "NameNode UI", url: "http://localhost:9870" },
                { label: "ResourceManager UI", url: "http://localhost:8088" },
                { label: "Job History Server", url: "http://localhost:19888" }
            ]
        }
    ];

    const quickCommands = [
        {
            title: "Start Existing Container",
            command: "docker start hadoop-lab && docker exec -it hadoop-lab bash",
            description: "Use this if you've already created the container"
        },
        {
            title: "Stop Container",
            command: "docker stop hadoop-lab",
            description: "Stop the Hadoop container when done"
        },
        {
            title: "Remove Container",
            command: "docker rm hadoop-lab",
            description: "Delete the container (you'll need to create it again)"
        },
        {
            title: "View Running Containers",
            command: "docker ps",
            description: "List all running Docker containers"
        }
    ];

    return (
        <motion.div
            className="docker-setup-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="setup-header">
                <div className="header-icon">
                    <Container size={48} />
                </div>
                <h1 className="setup-title">Docker Hadoop Setup Guide</h1>
                <p className="setup-subtitle">
                    Complete Hadoop environment for Exercises 2-11 using Docker
                </p>
                <div className="badges">
                    <span className="badge badge-primary">Free</span>
                    <span className="badge badge-success">Offline Capable</span>
                    <span className="badge badge-info">Full Hadoop Stack</span>
                </div>
            </header>

            <section className="prerequisites glass-card">
                <h2 className="section-title">
                    <AlertCircle size={24} /> Prerequisites
                </h2>
                <ul className="prereq-list">
                    <li>💻 Windows 10/11 Pro, macOS, or Linux</li>
                    <li>🧠 Minimum 8GB RAM (16GB recommended)</li>
                    <li>💾 At least 10GB free disk space</li>
                    <li>🌐 Internet connection for initial setup</li>
                    <li>⚡ CPU virtualization enabled in BIOS</li>
                </ul>
            </section>

            <section className="setup-steps">
                <h2 className="section-title">
                    <Package size={24} /> Setup Steps
                </h2>

                {dockerSteps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        className="step-card glass-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="step-header">
                            <div className="step-number">{step.id}</div>
                            <div className="step-info">
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>

                        {step.commands && (
                            <div className="command-block">
                                {step.commands.map((cmd, idx) => (
                                    <div key={idx} className="command-item">
                                        <pre className="command-text">{cmd}</pre>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(cmd, `${step.id}-${idx}`)}
                                            title="Copy command"
                                        >
                                            {copiedStep === `${step.id}-${idx}` ? (
                                                <CheckCircle size={18} />
                                            ) : (
                                                <Copy size={18} />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {step.links && (
                            <div className="links-container">
                                {step.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-button"
                                    >
                                        {link.label} <ExternalLink size={16} />
                                    </a>
                                ))}
                            </div>
                        )}

                        {step.note && (
                            <div className="step-note">
                                <AlertCircle size={16} />
                                <span>{step.note}</span>
                            </div>
                        )}

                        {step.expectedOutput && (
                            <div className="expected-output">
                                <strong>Expected Output:</strong>
                                <pre>{step.expectedOutput}</pre>
                            </div>
                        )}
                    </motion.div>
                ))}
            </section>

            <section className="quick-reference glass-card">
                <h2 className="section-title">
                    <Terminal size={24} /> Quick Reference Commands
                </h2>
                <div className="quick-commands-grid">
                    {quickCommands.map((item, idx) => (
                        <div key={idx} className="quick-command-card">
                            <h4>{item.title}</h4>
                            <p className="command-desc">{item.description}</p>
                            <div className="command-item">
                                <pre className="command-text small">{item.command}</pre>
                                <button
                                    className="copy-btn small"
                                    onClick={() => copyToClipboard(item.command, `quick-${idx}`)}
                                >
                                    {copiedStep === `quick-${idx}` ? (
                                        <CheckCircle size={16} />
                                    ) : (
                                        <Copy size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="troubleshooting glass-card">
                <h2 className="section-title">
                    <AlertCircle size={24} /> Troubleshooting
                </h2>
                <div className="troubleshooting-grid">
                    <div className="trouble-item">
                        <h4>🚫 "Cannot connect to Docker daemon"</h4>
                        <p>Solution: Make sure Docker Desktop is running. On Windows, check system tray.</p>
                    </div>
                    <div className="trouble-item">
                        <h4>🐌 Container is very slow</h4>
                        <p>Solution: Increase Docker Desktop memory allocation (Settings → Resources → Memory: 4GB+)</p>
                    </div>
                    <div className="trouble-item">
                        <h4>🔒 Port already in use</h4>
                        <p>Solution: Change port mapping: use -p 9871:50070 instead of -p 9870:50070</p>
                    </div>
                    <div className="trouble-item">
                        <h4>❌ Container exits immediately</h4>
                        <p>Solution: Make sure you're using the interactive flag: -it</p>
                    </div>
                </div>
            </section>

            <section className="next-steps glass-card">
                <h2 className="section-title">
                    <CheckCircle size={24} /> Next Steps
                </h2>
                <div className="next-steps-content">
                    <p>Once your Docker Hadoop environment is running, you can:</p>
                    <ul>
                        <li>✅ Complete <strong>Exercise 2</strong> - Verify Hadoop installation and web UIs</li>
                        <li>✅ Complete <strong>Exercise 3</strong> - Practice HDFS file operations</li>
                        <li>✅ Complete <strong>Exercises 4-9</strong> - Submit MapReduce jobs</li>
                        <li>✅ Complete <strong>Exercises 10-11</strong> - Run Pig and Hive scripts</li>
                    </ul>
                    <div className="cta-buttons">
                        <a href="#/" className="cta-btn primary">Back to Exercises</a>
                        <a href="#/cloud-shell" className="cta-btn secondary">Try Cloud Shell Alternative</a>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default DockerSetup;
