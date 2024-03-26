const action = async (context) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${context.config.accountId}/stream/copy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.config.apiToken}`,
      },
      body: JSON.stringify({
        url: context.input.url,
        meta: { name: context.input.name },
      }),
    }
  );
  console.log(await response.json());

  context.notify("Uploaded to Cloudflare!");
};

const config = {
  apiToken: {
    title: "API_TOKEN",
    type: "string",
    default: "",
    required: true,
  },
  accountId: {
    title: "ACCOUNT_ID",
    type: "string",
    default: "",
    required: true,
  },
};

const cloudflare = {
  title: "Share to Cloudflare",
  formats: ["mp4"],
  action,
  config,
};

exports.shareServices = [cloudflare];
