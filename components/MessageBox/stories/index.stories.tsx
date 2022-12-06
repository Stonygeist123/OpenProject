import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import fetchJson from "../../../lib/fetchJson";
import messages from "./messages.json";

import MessageBox from "../MessageBox";

export default {
  title: "Main/MessageBox",
  component: MessageBox,
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<any> = args => {
  return <MessageBox {...args} />;
};
const getMessageData = async () => {
  const x = await fetchJson<Message & { author: User; community: Community | null; project: Project | null }>(`http://localhost:8080/api/message/1`);
  console.log(x);
  return x;
};

export const Default = Template.bind({});
// Default.loaders = [
//   async () => ({
//     message: messages[0],
//   }),
// ];
Default.args = {
  message: messages[0],
};

// export const LoggedOut = Template.bind({});

/*
await (await fetch("http://localhost:8080/api/project/1/create/message", { method: "POST", body: JSON.stringify({ content: "Test", region: 1, isProject: true }),     headers: {
      "Content-Type": "application/json",
    }, })).json()
 */
