import { useState } from "react";
import { awardFeedbackReward, type FeedbackReward } from "../features/feedback/feedback-rewards";
import { VideoFeedbackForm, type VideoFeedbackInput } from "../features/feedback/video-feedback-form";

interface FeedbackRecord extends VideoFeedbackInput {
  reward: FeedbackReward;
}

const EMPTY_FORM: VideoFeedbackInput = {
  knowledgeNodeId: "",
  videoTitle: "",
  summary: "",
};

export function FeedbackPage() {
  const [formValue, setFormValue] = useState<VideoFeedbackInput>(EMPTY_FORM);
  const [records, setRecords] = useState<FeedbackRecord[]>([]);

  function handleSubmit() {
    const reward = awardFeedbackReward({
      knowledgeNodeId: formValue.knowledgeNodeId,
      videoTitle: formValue.videoTitle,
    });

    setRecords((current) => [{ ...formValue, reward }, ...current]);
    setFormValue(EMPTY_FORM);
  }

  return (
    <section className="stack">
      <h2>反馈</h2>
      <p>保存一次费曼式讲解，并领取对应的特殊奖励。</p>
      <VideoFeedbackForm value={formValue} onChange={setFormValue} onSubmit={handleSubmit} />

      <section className="panel stack">
        <h3>最近讲解</h3>
        {records.length === 0 ? (
          <p>还没有反馈记录。</p>
        ) : (
          <ul className="stack">
            {records.map((record) => (
              <li key={record.reward.id} className="stack tight">
                <strong>{record.videoTitle}</strong>
                <p>知识节点：{record.knowledgeNodeId}</p>
                <p>总结：{record.summary}</p>
                <p>已获得：{record.reward.badgeLabel}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel stack">
        <h3>特殊奖励</h3>
        {records.length === 0 ? (
          <p>还没有特殊奖励。</p>
        ) : (
          <ul className="stack">
            {records.map((record) => (
              <li key={`${record.reward.id}-item`} className="stack tight">
                <strong>{record.reward.badgeLabel}</strong>
                <p>{record.reward.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
