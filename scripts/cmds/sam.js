const axios = require("axios");

const API_KEY = "da5445b2d3394146928bda9d370beff989a4e8c9";
const BASE_URL = "https://simsimi-api-pro.onrender.com";

module.exports = {
  config: {
    name: "sam",
    version: "1.0",
    author: "Mot",
    countDown: 3,
    role: 0,
    shortDescription: {
      en: "Chat or teach Sam bot",
      vi: "Trò chuyện hoặc dạy Sim bot"
    },
    description: {
      en: "Chat with sam or teach it",
      vi: "Trò chuyện với sim hoặc dạy nó"
    },
    category: "AI",
    guide: {
      en: "sam <message>\nsam teach <ask> | <answer>",
      vi: "sam <nội dung>\nsam teach <hỏi> | <trả lời>"
    }
  },

  onStart: async function ({ message, args }) {
    try {
      // ===== TEACH MODE =====
      if (args[0] === "teach") {
        const input = args.slice(1).join(" ");
        if (!input.includes("|"))
          return message.reply("❌ Format: sam teach <ask> | <answer>");

        const [ask, ans] = input.split("|").map(t => t.trim());

        if (!ask || !ans)
          return message.reply("❌ Ask or Answer is missing");

        await axios.get(`${BASE_URL}/teach`, {
          params: {
            ask,
            ans,
            apikey: API_KEY
          }
        });

        return message.reply("✅ Teach successful!");
      }

      // ===== CHAT MODE =====
      const query = args.join(" ");
      if (!query)
        return message.reply("❌ Please enter a message");

      const res = await axios.get(`${BASE_URL}/sim`, {
        params: {
          query,
          apikey: API_KEY
        }
      });

      message.reply(res.data?.answer || "🤖 No response");

    } catch (err) {
      console.error(err);
      message.reply("❌ API error, please try again later");
    }
  }
};
