export interface VideoFeedbackInput {
  knowledgeNodeId: string;
  videoTitle: string;
  summary: string;
}

export function VideoFeedbackForm(props: {
  value: VideoFeedbackInput;
  onChange: (value: VideoFeedbackInput) => void;
  onSubmit: () => void;
}) {
  const canSubmit = Boolean(props.value.knowledgeNodeId.trim() && props.value.videoTitle.trim());

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) {
          props.onSubmit();
        }
      }}
    >
      <label>
        <span>Knowledge Node</span>
        <input
          value={props.value.knowledgeNodeId}
          onChange={(event) =>
            props.onChange({
              ...props.value,
              knowledgeNodeId: event.target.value,
            })
          }
        />
      </label>
      <label>
        <span>Video Title</span>
        <input
          value={props.value.videoTitle}
          onChange={(event) =>
            props.onChange({
              ...props.value,
              videoTitle: event.target.value,
            })
          }
        />
      </label>
      <label>
        <span>Summary</span>
        <textarea
          value={props.value.summary}
          onChange={(event) =>
            props.onChange({
              ...props.value,
              summary: event.target.value,
            })
          }
        />
      </label>
      <button type="submit" disabled={!canSubmit}>
        Save Feedback
      </button>
    </form>
  );
}
