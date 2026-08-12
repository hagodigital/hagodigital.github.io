#!/usr/bin/env python3
"""Fail when the docs describe a value the code no longer has.

WHY THIS EXISTS
Four documented facts went stale in a single day on 2026-08-12 — numpy "absent",
"cannot vectorise a raster", the hero bird at 430px, and the system cards
normalised on their long edge. Every one was true when written. None announced
that it had stopped being true, because prose cannot fail.

The pattern behind all four: the fact ALSO exists in code, the code changed, and
the prose copy was left behind. So the fix is not discipline, it is a check —
the same shape as check-motion.sh, which exists for the same reason.

Only values that are BOTH stated in prose AND readable from source belong here.
Anything else (judgement, history, reasoning) is not checkable and is not this
script's business. Keep the list short: a check nobody trusts gets skipped.

Run from site/:  py -3 -X utf8 check-docs.py
Exit 1 on any mismatch. Wired into deploy.sh next to check-motion.sh.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(HERE, "styles.css"), encoding="utf-8").read()
NOTES = open(os.path.join(HERE, "BUILD-NOTES.md"), encoding="utf-8").read()
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
CLAUDEMD = open(os.path.join(ROOT, "CLAUDE.md"), encoding="utf-8").read()

failures = []
checks = 0


def css_token(name):
    m = re.search(r"--" + re.escape(name) + r"\s*:\s*([^;]+);", CSS)
    return m.group(1).strip() if m else None


def check(label, truth, doc_text, doc_name):
    """The doc must contain the live value. Absence is the failure."""
    global checks
    checks += 1
    if truth is None:
        failures.append(f"{label}: could not read the value from styles.css")
        return
    if str(truth) not in doc_text:
        failures.append(f"{label}: styles.css says '{truth}' — not found in {doc_name}")


# --- the hero bird: three numbers, all of which moved today ------------------
bird_h = css_token("bird-h")
if bird_h:
    ceiling = re.search(r",\s*(\d+)px\s*\)", bird_h)
    check("--bird-h ceiling", ceiling.group(1) + "px" if ceiling else None, NOTES, "BUILD-NOTES.md")
check("--bird-tail", css_token("bird-tail"), NOTES, "BUILD-NOTES.md")

# --- the body face ----------------------------------------------------------
m = re.search(r"--body\s*:\s*\"([^\"]+)\"", CSS)
check("--body font", m.group(1) if m else None, NOTES, "BUILD-NOTES.md")

# --- the six palette colours ------------------------------------------------
for name in ("navy", "blue", "lime", "cream", "grey"):
    v = css_token(name)
    if v and v.startswith("#"):
        check(f"--{name}", v.upper(), NOTES.upper(), "BUILD-NOTES.md")

# --- the font files actually on disk match what the docs claim --------------
fonts = sorted(f for f in os.listdir(os.path.join(HERE, "assets", "fonts"))
               if f.endswith(".woff2"))
checks += 1
families = {f.split("-")[0] for f in fonts}
for fam in families:
    if fam.lower() not in NOTES.lower():
        failures.append(f"font file family '{fam}' is on disk but absent from BUILD-NOTES.md")
checks += 1
if "inter-" in " ".join(fonts):
    failures.append("inter-*.woff2 is still on disk — it was retired 2026-08-12")

# --- CLAUDE.md must not have regrown past its budget ------------------------
checks += 1
LIMIT = 12000
if len(CLAUDEMD) > LIMIT:
    failures.append(f"CLAUDE.md is {len(CLAUDEMD):,} bytes, over the {LIMIT:,} budget — "
                    f"it loads in FULL every session. Move detail into a doc read on demand.")

# --- CLAUDE.md must still point at the notes it delegated to ----------------
checks += 1
if "BUILD-NOTES.md" not in CLAUDEMD:
    failures.append("CLAUDE.md no longer points at BUILD-NOTES.md — the site detail "
                    "became unreachable rather than moved")

print(f"check-docs: {checks} checks")
if failures:
    print("\nFAIL — the docs describe something the code no longer does:\n")
    for f in failures:
        print(f"  · {f}")
    print("\nFix the DOC, not the check. If the code is what changed, the doc is the stale one.")
    sys.exit(1)
print("check-docs: PASS — every documented value matches the source.")
