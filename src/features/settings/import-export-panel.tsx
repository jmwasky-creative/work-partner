import { useRef } from "react";

interface ImportExportPanelProps {
  onExport: () => void | Promise<void>;
  onImport: (file: File) => void | Promise<void>;
}

export function ImportExportPanel(props: ImportExportPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="panel stack">
      <h3>存档工具</h3>
      <p>你可以导出当前本地存档，也可以导入之前保存的 JSON 快照。</p>
      <div>
        <button type="button" onClick={() => void props.onExport()}>
          导出存档
        </button>
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          导入存档
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) {
              return;
            }

            void props.onImport(file);
            event.currentTarget.value = "";
          }}
        />
      </div>
    </section>
  );
}
