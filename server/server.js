import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const execPromise = promisify(exec);
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Create temp directory for code execution
const TEMP_DIR = path.join(process.cwd(), 'temp');
await fs.mkdir(TEMP_DIR, { recursive: true });

// Timeout for code execution (10 seconds)
const EXECUTION_TIMEOUT = 10000;

// Execute Java code
async function executeJava(code, className) {
    const sessionId = uuidv4();
    const workDir = path.join(TEMP_DIR, sessionId);

    try {
        await fs.mkdir(workDir, { recursive: true });
        const javaFile = path.join(workDir, `${className}.java`);
        await fs.writeFile(javaFile, code);

        // Compile
        const compileCmd = `javac "${javaFile}"`;
        const { stderr: compileError } = await execPromise(compileCmd, {
            cwd: workDir,
            timeout: EXECUTION_TIMEOUT
        });

        if (compileError) {
            return { success: false, output: compileError, type: 'compile_error' };
        }

        // Execute
        const runCmd = `java -cp "${workDir}" ${className}`;
        const { stdout, stderr } = await execPromise(runCmd, {
            cwd: workDir,
            timeout: EXECUTION_TIMEOUT
        });

        return {
            success: true,
            output: stdout || stderr,
            type: 'success'
        };

    } catch (error) {
        if (error.killed) {
            return { success: false, output: 'Execution timeout (10s limit)', type: 'timeout' };
        }
        return { success: false, output: error.message, type: 'runtime_error' };
    } finally {
        // Cleanup
        try {
            await fs.rm(workDir, { recursive: true, force: true });
        } catch (cleanupError) {
            console.error('Cleanup error:', cleanupError);
        }
    }
}

// API endpoint to execute code
app.post('/api/execute', async (req, res) => {
    const { code, language, className } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    console.log(`Executing ${language} code for class: ${className}`);

    try {
        let result;

        if (language === 'java') {
            const extractedClassName = className || extractClassName(code);
            result = await executeJava(code, extractedClassName);
        } else {
            result = {
                success: false,
                output: `Language '${language}' not supported yet. Only Java is currently supported.`,
                type: 'unsupported'
            };
        }

        res.json(result);
    } catch (error) {
        console.error('Execution error:', error);
        res.status(500).json({
            success: false,
            output: error.message,
            type: 'server_error'
        });
    }
});

// Helper function to extract class name from Java code
function extractClassName(code) {
    const match = code.match(/public\s+class\s+(\w+)/);
    return match ? match[1] : 'Main';
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Code execution server is running' });
});

// Root route for user friendliness
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>🚀 Code Execution Server is Running</h1>
            <p>This is the backend API. Please visit the frontend application at:</p>
            <a href="http://localhost:5175" style="font-size: 1.2rem; color: #0ea5e9;">http://localhost:5175</a>
        </div>
    `);
});

app.listen(PORT, () => {
    console.log(`\n🚀 Code Execution Server running on http://localhost:${PORT}`);
    console.log(`✅ Ready to execute Java code\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    try {
        await fs.rm(TEMP_DIR, { recursive: true, force: true });
        console.log('✅ Cleaned up temp files');
    } catch (error) {
        console.error('Cleanup error:', error);
    }
    process.exit(0);
});
