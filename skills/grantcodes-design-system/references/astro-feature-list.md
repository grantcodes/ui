# FeatureList

Use for short feature summaries; Cards supports richer summaries.

```astro
---
import { FeatureList } from '@grantcodes/astro/blocks';
---
<FeatureList title="Included" items={[{ title: 'Private projects', description: 'Invite your team', icon: 'lock' }]} columns={3} />
```

Required items: { title, description?, icon?, href? }[]. Optional title/subtitle; columns defaults 3 (schema integer 1–4). Serializes to UI FeatureList; icon is a bundled Lucide kebab-case name, not arbitrary SVG. Optional h2 and item h3 headings require sensible hierarchy. No slots/events, static SSR. Validate URLs; strings are text. [UI content hooks](ui-content.md). Schema: featureListBlock.
