---
name: ricini.dev
description: Luiz Ricini's portfolio, a career drawn as a commit graph in daylight.
colors:
  ground: "#f4f5f7"
  ground-2: "#eaecf0"
  paper: "#ffffff"
  ink: "#0e1116"
  ink-2: "#3d4451"
  ink-3: "#5b6472"
  rule: "#d6dae1"
  lane-decode: "#2f4bff"
  lane-rendair: "#ec5a24"
  lane-rendair-text: "#b8380b"
  lane-epicure: "#10a37a"
  lane-epicure-text: "#0a7357"
  lane-onedev: "#8a4fff"
  lane-onedev-text: "#6531d6"
  lane-cyos: "#d19a00"
  lane-cyos-text: "#7f5c00"
  night: "#0e1116"
  night-2: "#171b22"
  night-rule: "#272c35"
  night-ink: "#e8eaee"
  night-ink-2: "#b4bbc7"
  night-ink-3: "#8a93a1"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 8.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 114"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.2vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 110"
  title-sm:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 106"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.3vw, 1.8rem)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    fontVariation: "\"wdth\" 104"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.5
    fontVariation: "\"wdth\" 87.5"
rounded:
  ref: "4px"
  chip: "6px"
  button: "8px"
  image: "10px"
  plate: "12px"
  node: "50%"
spacing:
  lane: "14px"
  bend: "36px"
  page-pad: "clamp(16px, 4vw, 48px)"
  gap-tight: "8px"
  gap: "32px"
  section-top: "120px"
  max-width: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.button}"
    padding: "0 15px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.lane-decode}"
    textColor: "{colors.paper}"
  button-ref:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 15px"
    height: "46px"
  button-ref-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  ref-head:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0 10px"
    height: "28px"
  ref-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0 10px"
    height: "28px"
  stack-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "4px 8px"
  lang-switch-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    padding: "5px 10px"
  terminal-plate:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "14px 16px 18px"
---

# Design System: ricini.dev

## Overview

**Creative North Star: "The Commit Graph in Daylight"**

The page is a `git log --graph` laid out on cool paper. A continuous branch graph runs down a left gutter; every section is a row that owns its slice of each lane, so stacked rows read as one unbroken history. Companies are colored lanes that fork from main and merge back; projects are merge commits; the hero is HEAD and the close is a second HEAD on an ink field. The look is GitHub's network graph at noon, not a neon terminal: light ground, ink type, hairline rules, and color reserved for lanes.

Density is editorial-technical. Big, expanded, heavy Archivo carries names and headings; Martian Mono, condensed, appears only where git data would appear (hashes, refs, dates, commit subjects, stack chips, the language switch). Proof is outcome-level: each project pairs its bullets with a stack-chip side column and its public link. Never show commit hashes or messages from private client repos.

Depth is nearly flat. One ink terminal plate in the hero and one ink close section are the only dark surfaces; everything else is ground, paper chips and 1px rules.

**Key Characteristics:**
- A left graph gutter (5 lanes at 14px plus 22px) on every row, drawn as 2px rounded lines, SVG bends and ring nodes.
- Lane color is identity: each company has a line color and a darker text-safe twin.
- Expanded heavy sans for display, condensed mono strictly for git data.
- Buttons and pills are git refs: ink fill for HEAD, 1.5px ink outline for tags.
- Light ground throughout; dark appears only as the hero terminal plate and the closing contact field.

## Colors

A cool neutral paper-and-ink base with a five-hue lane palette that only ever means "this company's branch".

### Primary
- **Ink** (`ink`): headings, body text, main-lane line and nodes, the primary button fill, HEAD ref fill, 1.5px outlines on buttons, refs and the language switch.
- **Decode Ultramarine** (`lane-decode`): the Decode lane, and the system's single interactive accent: focus outlines, text selection, caret, primary-button hover and the underline of the closing email. Text-safe as-is on ground.

### Secondary (lane palette)
- **Rendair Vermilion** (`lane-rendair`, text twin `lane-rendair-text`)
- **Epicure Green** (`lane-epicure`, text twin `lane-epicure-text`); also the open-to-work pulse dot.
- **Onedev Violet** (`lane-onedev`, text twin `lane-onedev-text`)
- **Cyos Ochre** (`lane-cyos`, text twin `lane-cyos-text`)

Lines, nodes, curves and lane dots use the bright color; `+` point markers, project links and the HEAD role-state pill use the text twin.

### Neutral
- **Cool Paper** (`ground`): page background, top bar, node fill for open commits.
- **Paper Shade** (`ground-2`): hover fill on the language switch.
- **White Paper** (`paper`): stack chip fill.
- **Ink 2** (`ink-2`): secondary text: intros, body copy in points, meta lines, nav links.
- **Ink 3** (`ink-3`): tertiary text: dates, captions, separators, merged role state.
- **Hairline** (`rule`): 1px row dividers, chip and image borders, resting link underline.
- **Night** (`night`, `night-2`, `night-rule`, `night-ink`, `night-ink-2`, `night-ink-3`): the terminal plate and the close section; its own ink ramp for text and its own rule for dividers.

### Named Rules
**The Lane Is Identity Rule.** A lane color appears only on things that belong to that company's branch (its line, node, dot, markers, links). Ultramarine doubles as the interaction accent; no other lane hue is used decoratively.

**The Text Twin Rule.** Bright lane colors draw lines; text in a lane color always uses its darker `-text` twin. On the night ground, lanes lift to lighter tints instead.

## Typography

**Display Font:** Archivo, variable width axis (with ui-sans-serif, system-ui)
**Body Font:** Archivo at normal width
**Label/Mono Font:** Martian Mono at 87.5% width (with ui-monospace, SF Mono, Menlo)

**Character:** One sans stretched wide and heavy for anything that names something, relaxed to 100% width for reading; a narrow mono that only speaks git.

### Hierarchy
- **Display**: the hero name and the closing title (close: clamp(2.75rem, 7.4vw, 5.75rem), line-height 0.95, same weight and width).
- **Headline**: section titles (Selected work, Experience, Stack).
- **Title**: project names; their row's node line is computed from this size.
- **Title Small**: company names in experience rows; stack group headings use the same weight and width at 1.05rem.
- **Lead**: the hero subject line, max 24ch; the quote uses a sibling at clamp(1.4rem, 2.7vw, 2.05rem), weight 550.
- **Body**: 1rem / 1.6; intros and summaries step to 1.06 to 1.15rem in `ink-2`, capped at 54 to 66ch.
- **Label**: mono 0.68 to 0.76rem, weight 500 to 700, for dates, refs, chips, the author line, the language switch and terminal rows. Tabular numerals on `code` and `time`.

### Named Rules
**The Mono Means Git Rule.** Martian Mono is used only for data git would print: refs, dates, merge subjects, stack names, the author line. Prose, headings, buttons and nav stay in Archivo.

**The Width Ladder Rule.** Heading width tracks rank: display 114%, headline 112%, title 110%, company 106 to 108%, lead 104%, body 100%, mono 87.5%. Bigger means wider and tighter-tracked (-0.035em down to -0.015em).

## Layout

Every content block is a two-column row: the graph gutter (`lane` x 5 + 22px; at 760px and below the lane shrinks to 10px, the gutter to lane x 5 + 8px and the bend to 28px) and a `minmax(0, 1fr)` body. Content is capped at 1280px with `page-pad` inline padding. Each row type sets its own node line (`--node-y`) from its heading size so nodes align with the first line of the heading.

Projects split 1.4fr / 1fr (claim column, proof column); roles split 12.5rem / 1fr (dates, content); the hero splits 1fr / 29rem (copy, terminal). All collapse to one column at 1080px (hero, projects) or 760px (roles, close grid); the nav hides at 760px. Section heads open with 120px top padding (88px mobile); project rows sit on a 1px top rule with 30px / 72px padding. Gaps run 8px for ref and button clusters, 32px between columns.

## Elevation & Depth

Flat by default; depth comes from tonal contrast (night against ground) and hairlines. The single shadow belongs to the hero terminal plate, which lifts slightly off the paper like a pasted screenshot.

### Shadow Vocabulary
- **Plate lift** (`box-shadow: 0 30px 60px -30px rgb(14 17 22 / 0.55), 0 2px 6px rgb(14 17 22 / 0.12)`): the terminal plate only.
- **Pulse ring** (`0 0 0 0` to `0 0 0 8px` of Epicure green, 2.4s): the open-to-work status dot only; disabled under reduced motion.

### Named Rules
**The One Plate Rule.** Only the dark terminal plate casts a shadow. Cards, images and chips sit flat on 1px rules.

## Shapes

Gently rounded and small: 4px on inline terminal refs and focus outlines, 5 to 7px on state pills and the language switch, 6px on refs and chips, 8px on buttons, 10px on screenshots, 12px on the terminal plate. Graph nodes are perfect circles with a 2.5px ring (filled for merges, outlined-and-offset for HEAD, smaller 9px for open tips); lines are 2px with 1px rounding, bends are round-capped SVG curves. Outlines are 1.5px ink on interactive refs and 1px `rule` on passive surfaces.

## Components

### Buttons
Buttons are refs: confident, outlined, small-radius.
- **Shape:** gently rounded (8px), 46px tall (44px mobile), 1.5px ink border, 18px icon plus label at 0.95rem / 650.
- **Primary:** ink fill, ground text; one per cluster (Email).
- **Hover / Focus:** outline buttons fill with ink; primary shifts to ultramarine fill and border with white text. 0.2s on the `ease-out` curve. Focus is the global 2px ultramarine outline at 3px offset.

### Refs and Chips
- **HEAD ref:** ink fill, ground text, mono label, 28px tall.
- **Tag ref:** 1.5px ink outline, may carry the pulse dot.
- **Stack chips:** white paper, 1px rule border, `ink-2` mono at 0.7rem.
- **Role state:** 1px rule outline, `ink-3`; the ongoing (HEAD) state takes the lane's text twin for border and text.

### Project Side Column
Stack chips (mono, paper fill, 1px rule, 6px radius) followed by public links in the lane's text twin, or a quiet `ink-3` note for client projects without public access. No commit logs.

### Terminal Plate (signature)
Night bar (12px top radius, `night-rule` underline, green `$` prompt) over a night log of mono merge rows (min 31px): single-lane mini-graph with nodes in each company's night tint, amber month, outlined project ref in the lane's night tint, wrapping subject in `night-ink-2`. On mobile, month + ref sit on line 1 and the subject wraps below.

### Navigation
Sticky ground top bar, 60px (56px mobile), hairline appears only after scroll. Brand is commit glyph plus `ricini.dev` at 750 / 108% width. Links `ink-2` at 0.94rem / 550, ink on hover. The EN/PT switch is a joined mono segmented control with a 1.5px ink frame; the current language is ink-filled.

### Links
Text links underline at 1.5px in `rule`, darkening to currentColor on hover while the arrow icon nudges up-right 2px. Project links take the lane text twin. On night, links hover to a light ultramarine tint.

### Graph Motion
Lines scale in from the top (1s), bends unclip (0.8s), nodes pop in (0.6s, 0.25s delay) as each row is reached. Hovering a lane's row dims every other lane to 16% and scales its nodes 1.25x; main never dims. Reduced motion shows the fully drawn graph.

## Do's and Don'ts

### Do:
- **Do** put new content in a graph row so the gutter stays continuous, and set the row's node line from its heading size.
- **Do** give any new company a lane: a bright line color and a darker text twin that passes contrast on `ground`.
- **Do** style calls to action as refs: 8px radius, 1.5px ink outline, ink fill for the single primary.
- **Do** keep Martian Mono at 87.5% width for git data and Archivo for everything else.
- **Do** separate content with 1px `rule` hairlines rather than cards.

### Don't:
- **Don't** introduce a dark page theme or neon terminal styling; night is reserved for the terminal plate and the close.
- **Don't** use a lane hue as decoration on content that does not belong to that lane.
- **Don't** add shadows to cards, chips or images; the terminal plate is the only lifted surface.
- **Don't** set prose, headings or buttons in mono.
- **Don't** replace the vertical graph with a horizontal timeline or a card grid of projects.
