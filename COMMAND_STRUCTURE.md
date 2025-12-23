# Command Structure Guide

This guide explains how to create a command for Goat Bot V2.

## Basic Template

```javascript
module.exports = {
  config: {
    name: "commandname",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 0,
    description: {
      vi: "Vietnamese description here",
      en: "English description here"
    },
    category: "category_name",
    guide: {
      vi: "Usage guide in Vietnamese: {pn} <argument>",
      en: "Usage guide in English: {pn} <argument>"
    },
    priority: 0
  },

  langs: {
    vi: {
      message1: "Vietnamese message",
      message2: "Another message"
    },
    en: {
      message1: "English message",
      message2: "Another message"
    }
  },

  onStart: async function({ message, args, event, threadsData, usersData, getLang }) {
    // Your command logic here
  }
};
```

## Config Options Explained

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Command name (lowercase, no spaces) |
| `version` | string | No | Version number (e.g., "1.0") |
| `author` | string | No | Command author name |
| `countDown` | number | Yes | Cooldown in seconds (how often user can use) |
| `role` | number | Yes | Required permission level: `0` = All users, `1` = Group admin, `2` = Bot admin |
| `description` | object | Yes | Multi-language descriptions (vi, en) |
| `category` | string | No | Command category (e.g., "fun", "info", "admin") |
| `guide` | object | No | Usage instructions in multiple languages |
| `priority` | number | No | Display priority (higher = shows first) |

## Command Parameters (onStart)

```javascript
onStart: async function({
  message,        // Message object - use message.send() or message.reply()
  args,          // Array of arguments after command name
  event,         // Event object with threadID, senderID, etc.
  threadsData,   // Database object for group data
  usersData,     // Database object for user data
  globalData,    // Global data object
  getLang,       // Function to get translated strings
  commandName,   // Name of the command
  role           // User's role in the group
}) {
  // Your code here
}
```

## Common Methods

### Sending Messages

```javascript
// Send a simple message
await message.send("Hello world");

// Reply to user
await message.reply("This is a reply");

// Send with formatting
await message.send({
  body: "Message content",
  attachment: [] // Optional: attach files/images
});
```

### Working with Arguments

```javascript
// args[0] is first argument after command
const userName = args[0];
const number = parseInt(args[1]);

// Check if arguments exist
if (!args[0]) {
  return message.reply("Please provide an argument");
}
```

### Using Database

```javascript
// Get data from group
const groupData = await threadsData.get(event.threadID);

// Get user data
const userData = await usersData.get(event.senderID);

// Update group data
await threadsData.set(event.threadID, "propertyName", value);

// Update user data
await usersData.set(event.senderID, "propertyName", value);
```

### Using Languages

```javascript
// Get translated string
const message = getLang("messageKey");

// With placeholders (use %1, %2, etc)
const greeting = getLang("hello", "John"); // If lang has %1
```

## Simple Example Command

```javascript
module.exports = {
  config: {
    name: "ping",
    version: "1.0",
    author: "YourName",
    countDown: 5,
    role: 0,
    description: {
      vi: "Kiểm tra xem bot có phản hồi không",
      en: "Check if bot is responding"
    },
    category: "info",
    guide: {
      vi: "{pn}",
      en: "{pn}"
    }
  },

  langs: {
    vi: {
      pong: "Pong! ✅"
    },
    en: {
      pong: "Pong! ✅"
    }
  },

  onStart: async function({ message, getLang }) {
    return message.reply(getLang("pong"));
  }
};
```

## Where to Save Commands

Save your command files in:
```
/scripts/cmds/yourcommandname.js
```

The command name will be automatically loaded based on the filename.

## Template Replacements

In `guide` and description fields, use these replacements:
- `{pn}` = prefix + command name (e.g., `-ping`)
- `{p}` = prefix only (e.g., `-`)
- `{n}` = command name only (e.g., `ping`)

## Command Aliases (Optional)

Add aliases to config to create shortcuts:

```javascript
config: {
  // ... other config
  aliases: ["p", "check"]  // Users can use -p or -check instead of -ping
}
```

## Role Levels

- `0` = Everyone can use
- `1` = Only group admins
- `2` = Only bot admins

## Tips

1. Always use `async` function for onStart
2. Always add both `vi` and `en` language strings
3. Add proper descriptions so users understand the command
4. Use `getLang()` to access translated strings
5. Always check for required arguments and return error if missing
6. Use proper variable names and structure your code well
7. Keep command names lowercase and simple

## Testing Your Command

1. Save the file in `/scripts/cmds/`
2. Restart the bot or wait for auto-reload
3. Use the command with prefix: `-commandname`
4. Check `-help commandname` to see command info
