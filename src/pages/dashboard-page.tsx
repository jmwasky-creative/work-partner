import { useEffect, useState } from "react";
import { parseSnapshot, serializeSnapshot } from "../data/import-export";
import { loadAppSnapshot, saveAppSnapshot } from "../data/repositories/app-repository";
import { createDemoSnapshot } from "../domain/seed-data";
import { PetSummaryCard, usePetProgress } from "../features/pet/pet-state";
import { ImportExportPanel } from "../features/settings/import-export-panel";

function isWorkspaceEmpty(snapshot: Awaited<ReturnType<typeof loadAppSnapshot>>) {
  return (
    snapshot.goals.length === 0 &&
    snapshot.tasks.length === 0 &&
    snapshot.stylePacks.length === 0 &&
    snapshot.appearanceItems.length === 0 &&
    snapshot.user.id === "local-user" &&
    snapshot.user.name === "Local Partner"
  );
}

async function loadSeededSnapshot() {
  const current = await loadAppSnapshot();
  return isWorkspaceEmpty(current) ? createDemoSnapshot() : current;
}

export function DashboardPage() {
  const { pet, addExperience } = usePetProgress();
  const [saveMessage, setSaveMessage] = useState("存档工具已准备就绪。");

  useEffect(() => {
    let cancelled = false;

    async function ensureDemoSnapshot() {
      const snapshot = await loadSeededSnapshot();
      await saveAppSnapshot(snapshot);

      if (!cancelled) {
        setSaveMessage("演示存档已加载到本地数据库。");
      }
    }

    void ensureDemoSnapshot().catch(() => {
      if (!cancelled) {
        setSaveMessage("当前无法使用存档工具。");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleExport() {
    try {
      const snapshot = await loadSeededSnapshot();
      const blob = new Blob([serializeSnapshot(snapshot)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "work-partner-save.json";
      link.click();
      URL.revokeObjectURL(url);
      setSaveMessage("已导出 JSON 存档。");
    } catch {
      setSaveMessage("导出失败，请稍后重试。");
    }
  }

  async function handleImport(file: File) {
    try {
      const raw = await file.text();
      const snapshot = parseSnapshot(raw);
      await saveAppSnapshot(snapshot);
      setSaveMessage(`已导入 ${snapshot.user.name} 的存档。`);
    } catch {
      setSaveMessage("导入失败，请选择有效的 JSON 存档文件。");
    }
  }

  return (
    <section className="stack">
      <h2>当前宠物成长</h2>
      <p>查看宠物阶段、当前经验，以及距离下一次进化还有多远。</p>
      <PetSummaryCard pet={pet} />
      <section className="panel stack">
        <h3>愿望事件</h3>
        <p>当未完成任务超过 3 个时，才会触发一次随机愿望绑定。</p>
        <button type="button" onClick={() => addExperience(35)}>
          完成一次任务（+35 经验）
        </button>
      </section>
      <ImportExportPanel onExport={handleExport} onImport={handleImport} />
      <p aria-live="polite">{saveMessage}</p>
    </section>
  );
}
