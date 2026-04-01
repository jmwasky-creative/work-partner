import { useState } from "react";
import { awardFeedbackReward, type FeedbackReward } from "../features/feedback/feedback-rewards";
import {
  VideoFeedbackForm,
  type VideoFeedbackInput,
} from "../features/feedback/video-feedback-form";

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
      <h2>Feedback</h2>
      <p>Save a Feynman-style explanation and earn a special reward.</p>
      <VideoFeedbackForm value={formValue} onChange={setFormValue} onSubmit={handleSubmit} />

      <section className="panel stack">
        <h3>Recent Explanations</h3>
        {records.length === 0 ? (
          <p>No feedback records yet.</p>
        ) : (
          <ul className="stack">
            {records.map((record) => (
              <li key={record.reward.id} className="stack tight">
                <strong>{record.videoTitle}</strong>
                <p>Knowledge node: {record.knowledgeNodeId}</p>
                <p>Summary: {record.summary}</p>
                <p>Earned: {record.reward.badgeLabel}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel stack">
        <h3>Special Rewards</h3>
        {records.length === 0 ? (
          <p>No special rewards yet.</p>
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
