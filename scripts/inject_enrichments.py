#!/usr/bin/env python3
"""
scripts/inject_enrichments.py

Injects natural, food-specific uniqueFailureMode, bonusFaq, uniqueEquipmentNote,
and uniqueSensoryCue into all 1,225 records in data/cook-times.ts.
"""

import json
import re
import sys

def escape_ts(s: str) -> str:
    # Normalize whitespace
    s = " ".join(s.strip().split())
    # Ensure all single quotes are properly escaped with a backslash
    s = s.replace(r"\'", "'").replace("'", r"\'")
    return s

def main():
    with open("scripts/enrichments_natural_generated.json") as f:
        enrichments = json.load(f)

    with open("data/cook-times.ts") as f:
        content = f.read()

    parts = content.split("\n  {\n")
    header = parts[0]
    blocks = parts[1:]

    print(f"Loaded {len(enrichments)} enrichments and {len(blocks)} datasheet blocks.")

    new_blocks = []
    matched_slugs = set()

    for idx, block in enumerate(blocks):
        slug_match = re.search(r"slug: '([a-z0-9-]+)'", block)
        if not slug_match:
            print(f"Error: No slug in block {idx}")
            sys.exit(1)
        
        slug = slug_match.group(1)
        if slug not in enrichments:
            print(f"Error: Slug {slug} missing from enrichments!")
            sys.exit(1)

        matched_slugs.add(slug)
        data = enrichments[slug]

        eq = escape_ts(data["uniqueEquipmentNote"])
        cue = escape_ts(data["uniqueSensoryCue"])
        m = escape_ts(data["uniqueFailureMode"]["mistake"])
        c = escape_ts(data["uniqueFailureMode"]["consequence"])
        p = escape_ts(data["uniqueFailureMode"]["prevention"])
        q = escape_ts(data["bonusFaq"]["q"])
        a = escape_ts(data["bonusFaq"]["a"])

        injection = (
            f"    uniqueEquipmentNote: '{eq}',\n"
            f"    uniqueSensoryCue: '{cue}',\n"
            f"    uniqueFailureMode: {{\n"
            f"      mistake: '{m}',\n"
            f"      consequence: '{c}',\n"
            f"      prevention: '{p}',\n"
            f"    }},\n"
            f"    bonusFaq: {{\n"
            f"      q: '{q}',\n"
            f"      a: '{a}',\n"
            f"    }},\n"
        )

        # Find line with technicalDeepDive
        # Replace the first occurrence in this block
        tdd_pattern = r"(    technicalDeepDive: '.*?',?\n)"
        m_tdd = re.search(tdd_pattern, block)
        if not m_tdd:
            print(f"Error: technicalDeepDive not found in block {slug}")
            sys.exit(1)

        tdd_end = m_tdd.end()
        new_block = block[:tdd_end] + injection + block[tdd_end:]
        new_blocks.append(new_block)

    new_content = header + "\n  {\n" + "\n  {\n".join(new_blocks)

    with open("data/cook-times.ts", "w") as f:
        f.write(new_content)

    print(f"Successfully injected enrichments into all {len(matched_slugs)} records in data/cook-times.ts.")

if __name__ == "__main__":
    main()
