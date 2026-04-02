import { useCallback, useMemo, useState } from "react";
import type { PetStage } from "../../domain/models";
import type { WishEvent } from "./pet-engine";
import { evolvePet } from "./pet-engine";

export interface PetState {
  stage: PetStage;
  experience: number;
  pendingAppearanceIds: string[];
  pendingWish: WishEvent | null;
}

const INITIAL_PET_STATE: PetState = {
  stage: "baby",
  experience: 0,
  pendingAppearanceIds: [],
  pendingWish: null,
};

const stageLabels: Record<PetStage, string> = {
  baby: "幼年期",
  growth: "成长期",
  advanced: "进阶期",
  final: "完全体",
};

export function usePetProgress() {
  const [state, setState] = useState<PetState>(INITIAL_PET_STATE);

  const addExperience = useCallback((amount: number) => {
    setState((prev) => {
      const totalExperience = prev.experience + amount;
      const evolution = evolvePet({
        stage: prev.stage,
        experience: totalExperience,
        pendingAppearanceIds: prev.pendingAppearanceIds,
        selectedAppearanceIds: [],
      });
      const experienceRemainder = totalExperience >= 100 ? totalExperience - 100 : totalExperience;
      return {
        ...prev,
        stage: evolution.nextStage,
        experience: experienceRemainder,
        pendingAppearanceIds: evolution.pendingAppearanceIds,
      };
    });
  }, []);

  const bindWish = useCallback((wish: WishEvent) => {
    setState((prev) => ({
      ...prev,
      pendingWish: wish,
      pendingAppearanceIds: [...prev.pendingAppearanceIds, wish.appearanceItemId],
    }));
  }, []);

  const summary = useMemo(
    () => ({
      stage: state.stage,
      experience: state.experience,
      pendingWish: state.pendingWish,
      pendingAppearanceIds: state.pendingAppearanceIds,
    }),
    [state],
  );

  return {
    pet: summary,
    addExperience,
    bindWish,
  };
}

export function PetSummaryCard(props: { pet: PetState }) {
  const { pet } = props;
  return (
    <div className="pet-summary">
      <p>
        阶段：<strong>{stageLabels[pet.stage]}</strong>
      </p>
      <p>
        经验：<strong>{pet.experience} / 100</strong>
      </p>
      <p>
        当前愿望：<strong>{pet.pendingWish ? pet.pendingWish.appearanceItemId : "暂无"}</strong>
      </p>
      <p>
        待领取外观：<strong>{pet.pendingAppearanceIds.join(", ") || "暂无"}</strong>
      </p>
    </div>
  );
}
