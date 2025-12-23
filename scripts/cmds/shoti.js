const axios = require("axios");

module.exports = {
  name: "shoti",
  version: "1.0.0",
  role: 0,
  author: "April Manalo",
  description: "Send random shoti video",
  category: "media",
  usage: "shoti",
  cooldown: 5,

  async onStart({ api, event }) {
    try {
      const msg = await api.sendMessage(
        "📡 Fetching shoti video...",
        event.threadID
      );

      const res = await axios.get("https://norch-project.gleeze.com/api/shoti");
      const data = res.data;

      if (!data || data.status !== "success") {
        return api.sendMessage(
          "❌ Failed to fetch shoti video.",
          event.threadID,
          event.messageID
        );
      }

      const videoStream = await axios({
        url: data.play,
        method: "GET",
        responseType: "stream"
      });

      const caption =
        `🎬 SHOTI VIDEO\n\n` +
        `📝 Title: ${data.title}\n` +
        `👤 TikTok: @${data.tiktok_author}\n` +
        `🔗 Original: ${data.original_url}\n\n` +
        `✨ Requested via GoatBot V2`;

      await api.sendMessage(
        {
          body: caption,
          attachment: videoStream.data
        },
        event.threadID,
        () => api.unsendMessage(msg.messageID)
      );

    } catch (err) {
      console.error(err);
      api.sendMessage(
        "❌ Error while sending shoti video.",
        event.threadID,
        event.messageID
      );
    }
  }
};
