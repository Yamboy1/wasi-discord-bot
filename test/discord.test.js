import { InteractionResponseType } from "discord-interactions";
import { parseContent } from "../src/discord.js";

test("a valid content message is parsed properly", () => {
  const parsed = parseContent("Type: Channel-Message\n\nPong!");
  expect(parsed).toEqual({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content: "Pong!" },
  });
});

test("a message with no type header should throw", () => {
  expect(() => {
    parseContent("Fake: Fake-Header\n\nPong!");
  }).toThrow(SyntaxError);
});

test("a message with an invalid type header should throw", () => {
  expect(() => {
    parseContent("Type: Message-Channel\n\nPong!");
  }).toThrow(SyntaxError);
});

test("a message with a syntactically invalid type header should throw", () => {
  expect(() => {
    parseContent("Type:Channel-Message\n\nPong!");
  }).toThrow(SyntaxError);
});

test("a message with no body should throw", () => {
  expect(() => {
    parseContent("Type: Channel-Message\n\n");
  }).toThrow(SyntaxError);
});

test("a message without a newline before the body should throw", () => {
  expect(() => {
    parseContent("Type: Channel-Message\nPong!");
  }).toThrow(SyntaxError);
});
