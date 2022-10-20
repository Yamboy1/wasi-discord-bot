import { InteractionResponseType } from "discord-interactions";

export function parseContent(content) {
  const lines = content.split("\n");
  const headers = new Map();
  let i = 0;
  for (const line of lines) {
    ++i;
    if (line == "") {
      break;
    }
    const [name, value] = line.split(": ");
    if (value == undefined) {
      throw new SyntaxError(`Invalid header on line ${i}`);
    }

    headers.set(name, value);
  }

  if (headers.get("Type") !== "Channel-Message") {
    throw new SyntaxError("Type must be Channel-Message");
  }

  if (i == lines.length) {
    throw new SyntaxError("No content body");
  }

  const body = lines.slice(i).join("\n").trim();
  if (body.length == 0) {
    throw new SyntaxError("Blank body");
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: body,
    },
  };
}
