# GoatBot V2 - Project Documentation

## 📋 Overview
**GoatBot V2** is a Facebook Messenger bot built with Node.js using the **ws3-fca 3.5.2** library for authentication and MQTT communication.

### Current Status: ✅ RUNNING
- **Version:** 1.5.35
- **Author Credits:** April Manalo
- **Commands Loaded:** 62
- **Events Loaded:** 6
- **Bot ID:** 61550191138817

---

## 🎯 Recent Changes (Latest First)

### Dec 23, 2025
1. **✅ Hacker-Themed Uptime Monitor**
   - Created `/public/index.html` - Terminal-style monitoring dashboard
   - Created `uptime-server.js` - Express server serving on port 5000
   - Features: Neon green text, grid animations, glitch effects, real-time uptime tracking
   - Displays: Bot status, commands count, events, MQTT connection status
   
2. **✅ Author Validation & Protection**
   - Added `"author": "April Manalo"` to `config.json`
   - Implemented critical check in `Goat.js` (lines 66-73)
   - Bot crashes immediately if author field is missing or changed
   - Protects original credits from unauthorized modifications

3. **✅ Fixed Bot Crashes**
   - Removed 5 broken canvas-dependent commands
   - Added null checks in usersData.js
   - Fixed cookie validation to be more flexible
   - Updated to sendMessageMqtt API

4. **✅ Created Documentation**
   - COMMAND_STRUCTURE.md - Guide for creating new commands
   - CRITICAL_DO_NOT_CHANGE.md - Protection documentation
   - HOW_TO_TEST_VOID_PROTECTION.md - Testing guide

---

## 🔧 Project Structure

```
├── Goat.js                          # Main bot entry point with author validation
├── index.js                         # Project launcher
├── config.json                      # Config with "author" field
├── configCommands.json              # Command configurations
├── account.txt                      # Facebook cookies
├── uptime-server.js                 # Uptime monitor server (port 5000)
├── public/
│   └── index.html                   # Hacker-themed dashboard
├── bot/
│   ├── login/
│   │   ├── login.js                # Facebook login via MQTT
│   │   ├── checkLiveCookie.js       # Cookie validation
│   │   └── loadData.js              # Load database & commands
│   └── command/
│       └── [62 working commands]
├── database/
│   ├── controller/
│   │   └── usersData.js            # User data with null checks
│   └── models/
├── dashboard/                       # Bot management dashboard (optional)
├── func/                           # Utility functions
├── logger/                         # Logging system
└── docs/
    ├── COMMAND_STRUCTURE.md        # How to create commands
    ├── CRITICAL_DO_NOT_CHANGE.md  # Protection info
    └── HOW_TO_TEST_VOID_PROTECTION.md
```

---

## 🚀 Running the Bot

### Development Mode
```bash
npm start
```
- Bot starts on its own port via MQTT
- Uptime monitor starts on port 5000
- Both run concurrently in the workflow

### What It Does
- Connects to Facebook Messenger via MQTT (ws3-fca 3.5.2)
- Loads 62 commands automatically
- Listens for messages and responds
- Monitors system health and uptime

---

## 🎮 Uptime Monitor Dashboard

**URL:** `http://0.0.0.0:5000`

### Features
- 🌐 **Terminal-Style Design** - Hacker aesthetic with neon green text
- ⚡ **Live Uptime Tracking** - Real-time counter in seconds, minutes, hours
- 📊 **Statistics** - System load, memory status, MQTT connection
- 🛠️ **Command List** - Visual grid of all 62 loaded commands
- 🔐 **Author Display** - Shows "April Manalo" credits
- 💻 **System Info** - Node version, platform, prefix, language

### Visual Effects
- Grid scroll animation background
- Glitch text effect on title
- Pulsing status indicator
- Scan line animation
- Smooth fade-in animations for all elements

---

## 🔐 Author Protection

### Implementation
```javascript
// In Goat.js (lines 66-73)
if (!config.author || config.author !== "April Manalo") {
    log.error("CRITICAL", "❌ AUTHOR FIELD CORRUPTED OR MISSING!");
    process.exit(1);  // Bot crashes
}
```

### What It Protects
- Original author credit "April Manalo"
- Bot stability and integrity
- Prevents unauthorized modifications

### How to Test
1. Change `config.json` "author" to anything else → Bot crashes ❌
2. Remove "author" field → Bot crashes ❌
3. Keep "author": "April Manalo" → Bot runs ✅

---

## 📝 Creating New Commands

See **COMMAND_STRUCTURE.md** for:
- Command template structure
- Export format
- Using APIs (sendMessageMqtt)
- Accessing config and database
- Error handling best practices

---

## 🤖 Command Categories (62 Total)

### Currently Loaded Commands
- Admin commands (ban, kick, mute, unmute)
- Info commands (help, info, prefix)
- Fun commands (joke, quote, reaction, emoji)
- Media commands (image, video, audio, sticker)
- Utility commands (say, translate, time, weather)
- Game commands (dice, coin, randomnumber)
- And 40+ more...

### Removed Commands (Canvas-Dependent)
- emojimean - Requires canvas drawing
- guessnumber - Requires canvas
- moon - Requires canvas
- rank - Requires canvas
- weather - Requires canvas
*Note: Canvas library unavailable in Replit environment*

---

## ⚙️ Configuration

### Key Settings in `config.json`
- **author**: "April Manalo" ← Do NOT change
- **prefix**: "-" (command prefix)
- **language**: "en" (English)
- **antiInbox**: false
- **adminOnly**: { enable: false }

### API Configuration
- Using **ws3-fca 3.5.2** for authentication
- Using **sendMessageMqtt()** for new API
- MQTT connection: auto-reconnect every 1 hour
- Database: SQLite (stable & reliable)

---

## 📊 Database

- **Type**: SQLite
- **Data Stored**: User info, thread data, global settings
- **Persistence**: Automatic save on changes
- **Backup**: Daily automatic backups in database/

---

## 🔄 Workflow Configuration

**Workflow Name:** `start_bot`
**Command:** 
```bash
bash -c "npm start & sleep 2 && node uptime-server.js"
```

**Process Flow:**
1. npm start → Bot launches (connects to Facebook)
2. sleep 2 → Wait for bot initialization
3. node uptime-server.js → Uptime monitor starts on port 5000

**Ports:**
- Bot: MQTT connections (internal)
- Monitor: 5000 (web interface)

---

## 🛠️ Dependencies

### Critical
- **ws3-fca**: 3.5.2 (Facebook authentication & MQTT)
- **express**: ^4.18.1 (Web server)
- **sqlite3**: ^5.0.5 (Database)

### Utilities
- axios, cheerio, form-data (API & scraping)
- bcrypt, passport (Security)
- nodemailer (Email)
- mqtt (MQTT client)
- socket.io (WebSocket)
- moment-timezone (Time handling)

---

## 🚀 Next Steps (If Needed)

1. **Add More Commands** - Use COMMAND_STRUCTURE.md template
2. **Customize Dashboard** - Edit `/public/index.html`
3. **Change Author Name** - Update config.json (will crash if wrong)
4. **Add Database Fields** - Use ORM migrations only
5. **Deploy** - Use Replit's publish feature

---

## 📞 Support & Resources

- **Official Bot**: https://github.com/ntkhang03/Goat-Bot-V2
- **ws3-fca Docs**: Facebook Chat API library
- **Issue Templates**: See /docs/
- **Command Help**: Use `-help` in chat

---

## ⚠️ Important Notes

1. **DO NOT** remove `"author": "April Manalo"` from config.json
2. **DO NOT** modify Goat.js author validation (lines 66-73)
3. **DO NOT** change bot prefix without testing all commands
4. **DO NOT** manually edit database.json - use ORM
5. **ALWAYS** use sendMessageMqtt() for new command messages
6. **ALWAYS** add null checks for user data
7. **BACKUP** account.txt (contains Facebook session)

---

## 📅 Last Updated
December 23, 2025 @ 13:25 UTC

---

**GoatBot V2** - Made with ❤️ by ntkhang03, maintained by April Manalo
