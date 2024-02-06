const sendToDiscord = async () => {
  const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`);
  const data = await response.json();

  const webhookUrl = process.env.WEBHOOK
  const payload = {
    username: "Reyvin Store",
    avatar_url:
      "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
    // content: "@everyone",
    embeds: [
      {
        title: "Request Data",
        thumbnail: { url: `${data.country_flag}` },
        fields: [
          {
            name: "**IP Address:**",
            value: `\`\`\`${data.ip}\`\`\``,
            inline: true,
          },
          {
            name: "**Negara:**",
            value: `\`\`\`${data.country_name}\`\`\``,
            inline: true,
          },
          {
            name: "**Kota:**",
            value: `\`\`\`${data.city}\`\`\``,
            inline: true,
          },
          {
            name: "**ISP**",
            value: `\`\`\`${
              data.connection_type
                ? data.connection_type
                : data.isp || data.organization
            }\`\`\``,
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: data.ip,
          icon_url:
            "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
        },
        color: 16711680,
      },
    ],
  };
  const sendResult = await fetch(webhookUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
};

const Request = () => {
    const data = sendToDiscord()
    return null
}

export default Request