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
    label: `${input.videoTitle} 的讲解奖励`,
    badgeLabel: `讲解徽章：${input.videoTitle}`,
    description: `你通过讲解知识节点 ${input.knowledgeNodeId} 获得了一份特殊奖励。`,
  };
}
