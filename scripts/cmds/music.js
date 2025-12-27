const axios = require("axios");

/**
 * 🔴 ROOT FIX
 * GoatBot V2 DOES NOT auto-create handleReply
 */
if (!global.client.handleReply) {
  global.client.handleReply = [];
}

module.exports = {
  config: {
    name: "music",
    version: "2.1.0",
    author: "April Manalo (YT Search + YTMP3)",
    role: 0,
    category: "music",
    guide: "-music <song name>"
  },

  onStart: async function ({ api, event, args }) {
    const { threadID } = event;
    const query = args.join(" ").trim();

    try {
      if (!query) {
        return api.sendMessage(
          "⚠️ Usage: -music <song name>\nExample: -music hiling mark carpio",
          threadID
        );
      }

      await api.sendMessage("🔎 Searching music on YouTube...", threadID);

      // 🔍 YOUTUBE SEARCH
      const searchRes = await axios.get(
        "https://norch-project.gleeze.com/api/youtube",
        { params: { q: query } }
      );

      const results = searchRes.data?.results;

      if (!results || results.length === 0) {
        return api.sendMessage("❌ No results found.", threadID);
      }

      // ✅ AUTO PICK FIRST RESULT
      const video = results[0];

      await api.sendMessage(
        `✅ Found:\n🎵 ${video.title}\n📺 ${video.channel}\n⏱ ${video.duration}\n\n⬇️ Downloading audio...`,
        threadID
      );

      // ⬇️ YTMP3 DOWNLOAD
      const dlRes = await axios.get(
        "https://norch-project.gleeze.com/api/ytmp3",
        { params: { url: video.url } }
      );

      const data = dlRes.data?.result;

      if (!data || !data.downloadUrl) {
        return api.sendMessage("❌ Failed to get MP3 download link.", threadID);
      }

      // 🖼 SEND COVER
      if (data.cover) {
        await api.sendMessage(
          {
            body: `🎧 ${data.title}\n⏱ ${data.duration}\n🎼 MP3 ${data.quality}kbps`,
            attachment: await global.utils.getStreamFromURL(data.cover)
          },
          threadID
        );
      }

      // 🎵 SEND MP3 FILE
      await api.sendMessage(
        {
          body: "📁 Here is your audio file:",
          attachment: await global.utils.getStreamFromURL(data.downloadUrl)
        },
        threadID
      );

      await api.sendMessage("✅ Download complete! 🎉", threadID);

    } catch (err) {
      console.error("[MUSIC ERROR]", err);
      api.sendMessage("❌ Error while downloading. Try again later.", threadID);
    }
  }
};
