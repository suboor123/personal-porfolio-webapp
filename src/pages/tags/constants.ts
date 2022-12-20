import { SkillsLevel } from "src/core/models/tags/types";

export const tagColorByLevel: Record<SkillsLevel, string> = {
    [SkillsLevel.Basic]: 'yellow',
    [SkillsLevel.Medium]: 'blue',
    [SkillsLevel.Expert]: 'green'
}

