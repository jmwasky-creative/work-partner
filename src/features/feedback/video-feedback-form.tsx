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
        <span>知识节点</span>
        <input
          aria-label="知识节点"
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
        <span>视频标题</span>
        <input
          aria-label="视频标题"
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
        <span>总结</span>
        <textarea
          aria-label="总结"
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
        保存反馈
      </button>
    </form>
  );
}
