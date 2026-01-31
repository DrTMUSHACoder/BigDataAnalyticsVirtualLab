import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import './LiveTerminal.css';

const LiveTerminal = ({ exercise }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [showTerminal, setShowTerminal] = useState(false);
    const logsEndRef = useRef(null);

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const runSimulation = () => {
        setIsRunning(true);
        setShowTerminal(true);
        setLogs([]);

        // Determine simulation type based on title/content
        const isHadoop = exercise.title.toLowerCase().includes('hadoop') || exercise.title.toLowerCase().includes('mapreduce') || exercise.code.includes('Mapper');
        const isPig = exercise.title.toLowerCase().includes('pig');
        const isHive = exercise.title.toLowerCase().includes('hive');

        let scenario = [];

        if (isHadoop) {
            scenario = [
                { text: `javac ${exercise.title.replace(/\s/g, '')}.java`, delay: 800 },
                { text: `jar -cvf job.jar *.class`, delay: 1500 },
                { text: `added manifest`, delay: 1700, type: 'info' },
                { text: `adding: ${exercise.title.replace(/\s/g, '')}.class(in = 1420) (out= 800)(deflated 40%)`, delay: 1900 },
                { text: `hadoop jar job.jar ${exercise.title.replace(/\s/g, '')} /input /output`, delay: 2500, type: 'cmd' },
                { text: `INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032`, delay: 3200 },
                { text: `INFO input.FileInputFormat: Total input paths to process : 1`, delay: 3500 },
                { text: `INFO mapreduce.JobSubmitter: number of splits:1`, delay: 3800 },
                { text: `INFO mapreduce.Job: The url to track the job: http://localhost:8088/proxy/application_1532_0001/`, delay: 4200 },
                { text: `INFO mapreduce.Job: Running job: job_1532_0001`, delay: 4500 },
                { text: `INFO mapreduce.Job:  map 0% reduce 0%`, delay: 5500 },
                { text: `INFO mapreduce.Job:  map 100% reduce 0%`, delay: 7500 },
                { text: `INFO mapreduce.Job:  map 100% reduce 100%`, delay: 9500 },
                { text: `INFO mapreduce.Job: Job job_1532_0001 completed successfully`, delay: 10000, type: 'success' },
                { text: `hdfs dfs -cat /output/*`, delay: 11000, type: 'cmd' },
                { text: exercise.output, delay: 11500, type: 'output' }
            ];
        } else if (isPig) {
            scenario = [
                { text: `pig -x local script.pig`, delay: 1000, type: 'cmd' },
                { text: `INFO pig.ExecTypeProvider: Trying ExecType : LOCAL`, delay: 1500 },
                { text: `INFO pig.BackendContext: Picked up JAVA_HOME at /usr/lib/jvm/java-8-openjdk-amd64`, delay: 1800 },
                { text: `Input(s):`, delay: 2500 },
                { text: `Successfully read records from: "student.txt"`, delay: 2800 },
                { text: `Output(s):`, delay: 3500 },
                { text: `Successfully stored records in: "output_pig"`, delay: 3800 },
                { text: `cat output_pig/*`, delay: 4500, type: 'cmd' },
                { text: exercise.output, delay: 5000, type: 'output' }
            ];
        } else if (isHive) {
            scenario = [
                { text: `hive -f query.hql`, delay: 1000, type: 'cmd' },
                { text: `Logging initialized using configuration in jar:file:/usr/local/hive/lib/hive-common.jar`, delay: 1500 },
                { text: `OK`, delay: 2000 },
                { text: `Time taken: 1.23 seconds`, delay: 2200 },
                { text: `Querying...`, delay: 3000 },
                { text: `MapReduce Jobs Launched:`, delay: 4000 },
                { text: `Job 0: Map: 1  Reduce: 1   Cumulative CPU: 2.3 sec   HDFS Read: 420 HDFS Write: 215 SUCCESS`, delay: 6000 },
                { text: `Total MapReduce CPU Time Spent: 2 seconds 300 msec`, delay: 6200 },
                { text: `OK`, delay: 7000, type: 'success' },
                { text: exercise.output, delay: 7500, type: 'output' }
            ];
        } else {
            // Default Java
            scenario = [
                { text: `javac ${exercise.title.split(' ')[0] || 'Main'}.java`, delay: 800, type: 'cmd' },
                { text: `java ${exercise.title.split(' ')[0] || 'Main'}`, delay: 2000, type: 'cmd' },
                { text: exercise.output, delay: 2500, type: 'output' }
            ];
        }

        let timeouts = [];
        scenario.forEach(step => {
            const timeout = setTimeout(() => {
                setLogs(prev => [...prev, step]);
                if (step === scenario[scenario.length - 1]) {
                    setIsRunning(false);
                }
            }, step.delay);
            timeouts.push(timeout);
        });

        // Cleanup
        return () => timeouts.forEach(clearTimeout);
    };

    return (
        <div className="simulation-wrapper">
            {!showTerminal ? (
                <button
                    className="run-btn"
                    onClick={runSimulation}
                >
                    <Play size={18} fill="currentColor" /> Run Simulation
                </button>
            ) : (
                <div className="terminal-overlay">
                    <div className="terminal-header">
                        <div className="terminal-dot dot-red" onClick={() => setShowTerminal(false)}></div>
                        <div className="terminal-dot dot-yellow"></div>
                        <div className="terminal-dot dot-green"></div>
                        <span className="terminal-title">user@lab-machine: ~</span>
                        <button className="reset-btn" onClick={runSimulation} title="Rerun">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                    <div className="terminal-body">
                        {logs.map((log, i) => (
                            <div key={i} className={`log-entry ${log.type || ''}`}>
                                {log.type === 'cmd' && <span className="cmd-prompt">$</span>}
                                {log.text}
                            </div>
                        ))}
                        {isRunning && <span className="cursor"></span>}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveTerminal;
