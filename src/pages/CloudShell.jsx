import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Terminal, ExternalLink, Copy, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import './CloudShell.css';

const CloudShell = () => {
    const [copiedStep, setCopiedStep] = useState(null);

    const copyToClipboard = (text, stepId) => {
        navigator.clipboard.writeText(text);
        setCopiedStep(stepId);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    const setupCommands = [
        {
            id: 1,
            title: "Update System Packages",
            commands: ["sudo apt-get update"],
            description: "Ensure package lists are up to date"
        },
        {
            id: 2,
            title: "Install Java 8 (Required for Hadoop)",
            commands: [
                "sudo apt-get install -y openjdk-8-jdk",
                "java -version"
            ],
            description: "Hadoop requires Java 8 to run properly"
        },
        {
            id: 3,
            title: "Download Hadoop",
            commands: [
                "wget https://archive.apache.org/dist/hadoop/common/hadoop-2.7.7/hadoop-2.7.7.tar.gz",
                "tar -xzf hadoop-2.7.7.tar.gz",
                "mv hadoop-2.7.7 hadoop"
            ],
            description: "Download and extract Hadoop binaries"
        },
        {
            id: 4,
            title: "Configure Environment Variables",
            commands: [
                "export HADOOP_HOME=~/hadoop",
                "export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin",
                "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64"
            ],
            description: "Set up Hadoop and Java environment paths"
        },
        {
            id: 5,
            title: "Configure Hadoop (Pseudo-Distributed Mode)",
            commands: [
                "cd ~/hadoop/etc/hadoop",
                "# Edit core-site.xml and hdfs-site.xml (see configuration below)"
            ],
            description: "Configure Hadoop for single-node cluster"
        },
        {
            id: 6,
            title: "Format HDFS",
            commands: ["hdfs namenode -format"],
            description: "Initialize the Hadoop filesystem"
        },
        {
            id: 7,
            title: "Start Hadoop Services",
            commands: [
                "start-dfs.sh",
                "start-yarn.sh",
                "jps"
            ],
            description: "Launch HDFS and YARN daemons"
        }
    ];

    const configurations = {
        coreSite: `<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>`,
        hdfsSite: `<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>file:///home/USERNAME/hadoop/data/namenode</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>file:///home/USERNAME/hadoop/data/datanode</value>
    </property>
</configuration>`
    };

    const quickStart = `# Quick Start Script - Run this in Cloud Shell
# Save as setup-hadoop.sh and run: bash setup-hadoop.sh

#!/bin/bash
echo "🚀 Starting Hadoop Quick Setup..."

# Install Java
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk

# Download Hadoop
wget -q https://archive.apache.org/dist/hadoop/common/hadoop-2.7.7/hadoop-2.7.7.tar.gz
tar -xzf hadoop-2.7.7.tar.gz
mv hadoop-2.7.7 hadoop

# Set environment
export HADOOP_HOME=~/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64

echo "export HADOOP_HOME=~/hadoop" >> ~/.bashrc
echo "export PATH=\\$PATH:\\$HADOOP_HOME/bin:\\$HADOOP_HOME/sbin" >> ~/.bashrc
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> ~/.bashrc

echo "✅ Hadoop setup complete! Run 'source ~/.bashrc' to activate environment."
`;

    return (
        <motion.div
            className="cloud-shell-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header className="setup-header">
                <div className="header-icon cloud">
                    <Cloud size={48} />
                </div>
                <h1 className="setup-title">Google Cloud Shell Setup</h1>
                <p className="setup-subtitle">
                    Run Hadoop exercises in the cloud without local installation
                </p>
                <div className="badges">
                    <span className="badge badge-cloud">Cloud-Based</span>
                    <span className="badge badge-warning">Free Tier</span>
                    <span className="badge badge-fast">Quick Setup</span>
                </div>
            </header>

            <section className="info-cards">
                <div className="info-card glass-card pro">
                    <h3>✅ Pros</h3>
                    <ul>
                        <li>No local installation required</li>
                        <li>Free Google Cloud access</li>
                        <li>Pre-installed Linux tools</li>
                        <li>5GB persistent storage</li>
                    </ul>
                </div>
                <div className="info-card glass-card con">
                    <h3>⚠️ Cons</h3>
                    <ul>
                        <li>Session timeout (20 min idle)</li>
                        <li>Weekly usage limit (60 hours)</li>
                        <li>No web UI access (only CLI)</li>
                        <li>Requires Google account</li>
                    </ul>
                </div>
            </section>

            <section className="glass-card launch-section">
                <h2 className="section-title">
                    <Zap size={24} /> Quick Launch
                </h2>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                        Click the button below to open Google Cloud Shell:
                    </p>
                    <div className="launch-group">
                        <a
                            href="https://shell.cloud.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="launch-button"
                        >
                            <Cloud size={20} />
                            Open Cloud Shell
                            <ExternalLink size={16} />
                        </a>
                        <div className="url-display">
                            <code>https://shell.cloud.google.com</code>
                        </div>
                    </div>
                </div>
            </section>

            <section className="quick-script glass-card">
                <h2 className="section-title">
                    <Terminal size={24} /> Quick Setup Script
                </h2>
                <p>Copy and paste this script into Cloud Shell for automated setup:</p>
                <div className="code-block">
                    <pre>{quickStart}</pre>
                    <button
                        className="copy-btn-large"
                        onClick={() => copyToClipboard(quickStart, 'quickstart')}
                    >
                        {copiedStep === 'quickstart' ? (
                            <>
                                <CheckCircle size={18} /> Copied!
                            </>
                        ) : (
                            <>
                                <Copy size={18} /> Copy Script
                            </>
                        )}
                    </button>
                </div>
            </section>

            <section className="manual-setup">
                <h2 className="section-title">
                    <Terminal size={24} /> Manual Setup Steps
                </h2>

                {setupCommands.map((step, index) => (
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

                        <div className="command-block">
                            {step.commands.map((cmd, idx) => (
                                <div key={idx} className="command-item">
                                    <pre className="command-text">{cmd}</pre>
                                    <button
                                        className="copy-btn"
                                        onClick={() => copyToClipboard(cmd, `${step.id}-${idx}`)}
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
                    </motion.div>
                ))}
            </section>

            <section className="configurations glass-card">
                <h2 className="section-title">
                    <Terminal size={24} /> Configuration Files
                </h2>
                <div className="config-grid">
                    <div className="config-item">
                        <h3>core-site.xml</h3>
                        <div className="code-block">
                            <pre>{configurations.coreSite}</pre>
                            <button
                                className="copy-btn-large"
                                onClick={() => copyToClipboard(configurations.coreSite, 'core-site')}
                            >
                                {copiedStep === 'core-site' ? (
                                    <CheckCircle size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="config-item">
                        <h3>hdfs-site.xml</h3>
                        <div className="code-block">
                            <pre>{configurations.hdfsSite}</pre>
                            <button
                                className="copy-btn-large"
                                onClick={() => copyToClipboard(configurations.hdfsSite, 'hdfs-site')}
                            >
                                {copiedStep === 'hdfs-site' ? (
                                    <CheckCircle size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="limitations glass-card">
                <h2 className="section-title">
                    <AlertTriangle size={24} /> Important Limitations
                </h2>
                <ul className="limit-list">
                    <li>
                        <strong>No Web UI:</strong> You won't be able to access localhost:9870 or localhost:8088
                        as Cloud Shell doesn't expose ports to your browser
                    </li>
                    <li>
                        <strong>Session Timeout:</strong> Cloud Shell sessions close after 20 minutes of inactivity.
                        Your files persist, but Hadoop services will stop
                    </li>
                    <li>
                        <strong>Weekly Limit:</strong> 60 hours per week maximum usage
                    </li>
                    <li>
                        <strong>Restart Required:</strong> You'll need to restart Hadoop services each time you reconnect
                    </li>
                </ul>
            </section>
        </motion.div>
    );
};

export default CloudShell;
