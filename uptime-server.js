const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for bot status
app.get('/api/status', (req, res) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    // Read real stats from file
    let commands = 62;
    let events = 6;
    try {
        if (fs.existsSync(path.join(__dirname, 'bot-stats.json'))) {
            const stats = JSON.parse(fs.readFileSync(path.join(__dirname, 'bot-stats.json'), 'utf8'));
            commands = stats.commands || 62;
            events = stats.events || 6;
        }
    } catch (err) {
        // Fallback to default values if file doesn't exist or can't be read
    }

    res.json({
        status: 'online',
        uptime: `${hours}h ${minutes}m ${seconds}s`,
        version: '1.5.35',
        commands: commands,
        events: events,
        author: 'April Manalo'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🎯 GoatBot V2 - Uptime Monitor`);
    console.log(`📡 Server running on http://0.0.0.0:${PORT}`);
    console.log(`⚡ Hacker Terminal Dashboard Active!\n`);
});
