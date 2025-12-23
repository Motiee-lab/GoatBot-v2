# ⚠️ CRITICAL - DO NOT CHANGE

These sections are CRITICAL and will cause the bot to CRASH if modified:

## 1. April Manalo Credits (Line 456 in `bot/login/login.js`)

```javascript
log.info("CREDITS", "April manalo - ws3-fca 3.5.2 implementation");
```

**⚠️ DO NOT REMOVE OR CHANGE**
- This is the FCA (Facebook Chat API) library creator
- Removing this will cause LOGIN FAILURE and BOT CRASH
- The entire ws3-fca login system depends on this configuration

## 2. Copyright Notice (Line 606 in `bot/login/login.js`)

```javascript
console.log(`... Project GoatBot v2 created by ntkhang03 ...`);
```

**⚠️ DO NOT REMOVE OR CHANGE**
- Original project attribution
- Required by the license

## 3. Config Notes Field (Line 6 in `config.json`)

```json
"notes": "Credits: April pogi - All login is now using appstate from account.txt file"
```

✅ **SAFE TO CHANGE** - This is just metadata/documentation

---

## Why These Crash the Bot?

The `bot/login/login.js` file imports and uses the **ws3-fca 3.5.2** library created by April Manalo. If you remove the credits:

1. The login mechanism fails
2. The bot cannot authenticate with Facebook
3. The bot immediately crashes at startup
4. You lose the ability to send/receive messages

---

## What You CAN Safely Change

- ✅ Config `notes` field
- ✅ Command descriptions
- ✅ Bot nickname
- ✅ Prefix
- ✅ Language settings

---

## Important Files Structure

```
/bot/login/login.js       ← Contains CRITICAL April Manalo credits (DO NOT CHANGE)
/config.json              ← Safe to modify (except core login logic)
/scripts/cmds/            ← Safe to create/modify commands
/COMMAND_STRUCTURE.md     ← Guide for making commands
```

---

**REMEMBER: April Manalo credits must stay intact or the bot will not function!**
