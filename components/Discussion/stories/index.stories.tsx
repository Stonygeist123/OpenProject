import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import threads from "./threads.json";

import Discussion from "../";

export default {
  title: "Main/DiscussionThread",
  component: Discussion,
} as ComponentMeta<typeof Discussion>;

const Template: ComponentStory<typeof Discussion> = (args: {}) => {
  return (
    <>
      <Discussion
        threads={[]}
        {...args}
      />
    </>
  );
};

const map = (threads: Thread[]): Thread[] =>
  threads.map(t => ({ top: { ...t.top, created_at: new Date(t.top.created_at), edited_at: new Date(t.top.edited_at) }, replies: map(t.replies) }));

export const Default = Template.bind({});
Default.args = {
  threads: map(threads as unknown as Thread[]).sort((a, b) => a.top.created_at.getTime() - b.top.created_at.getTime()),
};

// export const LoggedOut = Template.bind({});
