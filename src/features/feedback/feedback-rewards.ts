export interface FeedbackReward {
  id: string;
  itemType: "special-item";
  label: string;
  badgeLabel: string;
  description: string;
}

export function awardFeedbackReward(input: {
  knowledgeNodeId: string;
  videoTitle: string;
}): FeedbackReward {
  const normalizedNode = input.knowledgeNodeId.replace(/\s+/g, "-").toLowerCase();

  return {
    id: `${normalizedNode}-reward`,
    itemType: "special-item",
    label: `Explanation reward for ${input.videoTitle}`,
    badgeLabel: `Explanation Badge: ${input.videoTitle}`,
    description: `A special reward earned by teaching back the knowledge node ${input.knowledgeNodeId}.`,
  };
}
