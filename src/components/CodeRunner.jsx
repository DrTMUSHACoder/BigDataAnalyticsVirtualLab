import React, { useState } from 'react';
import { Play, RotateCcw, Code2, Terminal as TerminalIcon } from 'lucide-react';
import './CodeRunner.css';

const CodeRunner = ({ code, language = 'java', className }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [showOutput, setShowOutput] = useState(false);

    const runCode = async () => {
        setIsRunning(true);
        setError(null);
        setOutput('Compiling and executing...\n');
        setShowOutput(true);

        try {
            const response = await fetch('http://localhost:3001/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                    language,
                    className: className || extractClassName(code)
                })
            });

            const result = await response.json();

            if (result.success) {
                setOutput(result.output);
            } else {
                setError(result.type);
                setOutput(result.output);
            }
        } catch (err) {
            setError('connection_error');
            setOutput(`❌ Cannot connect to execution server.\n\nMake sure the backend server is running on port 3001.\n\nRun: cd server && npm start`);
        } finally {
            setIsRunning(false);
        }
    };

    const extractClassName = (code) => {
        const match = code.match(/public\s+class\s+(\w+)/);
        return match ? match[1] : 'Main';
    };

    return (
        <div className="code-runner-wrapper">
            <button
                className="run-code-btn"
                onClick={runCode}
                disabled={isRunning}
            >
                {isRunning ? (
                    <>
                        <div className="spinner"></div>
                        Running...
                    </>
                ) : (
                    <>
                        <Play size={18} fill="currentColor" />
                        Run Code
                    </>
                )}
            </button>

            {showOutput && (
                <div className={`execution-terminal ${error ? 'has-error' : 'success'}`}>
                    <div className="terminal-header">
                        <div className="terminal-controls">
                            <div className="terminal-dot dot-red" onClick={() => setShowOutput(false)}></div>
                            <div className="terminal-dot dot-yellow"></div>
                            <div className="terminal-dot dot-green"></div>
                        </div>
                        <span className="terminal-title">
                            <TerminalIcon size={14} /> Output
                        </span>
                        <button className="reset-btn" onClick={runCode} disabled={isRunning} title="Rerun">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                    <div className="terminal-body">
                        <pre className={error ? 'error-output' : 'success-output'}>
                            {output}
                        </pre>
                        {isRunning && <span className="cursor-blink">▊</span>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeRunner;
