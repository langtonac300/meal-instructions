#!/usr/bin/env python3
"""
scripts/compile_deep_dive_posts.py

Compiles all 35 deep-dive posts into data/blog/deep-dive-posts.ts.
Ensures valid TypeScript syntax, proper escaping, and exact BlogPost typing.
"""

import json
import os
import sys

from author_deep_dive_corpus import POSTS as science_posts
from author_posts_equipment import POSTS as equipment_posts
from author_posts_technique import POSTS as technique_posts
from author_posts_safety import POSTS as safety_posts
from author_posts_operations import POSTS as operations_posts

all_posts = science_posts + equipment_posts + technique_posts + safety_posts + operations_posts

print(f"Total compiled posts: {len(all_posts)}")
assert len(all_posts) == 35, f"Expected 35 posts, got {len(all_posts)}"

# Verify ID sequence
for idx, p in enumerate(all_posts):
    expected_id = f"blog-{86 + idx:03d}"
    assert p["id"] == expected_id, f"ID mismatch at index {idx}: expected {expected_id}, got {p['id']}"

output_path = "data/blog/deep-dive-posts.ts"

lines = [
    "import { BlogPost } from '@/lib/types';",
    "",
    "export const DEEP_DIVE_POSTS: BlogPost[] = [",
]

for p in all_posts:
    lines.append("  {")
    lines.append(f"    id: '{p['id']}',")
    lines.append(f"    slug: '{p['slug']}',")
    # Escape single quotes in strings
    title_esc = p['title'].replace(r"\'", "'").replace("'", r"\'")
    subtitle_esc = p['subtitle'].replace(r"\'", "'").replace("'", r"\'")
    summary_esc = p['summary'].replace(r"\'", "'").replace("'", r"\'")
    cat_name_esc = p['categoryName'].replace(r"\'", "'").replace("'", r"\'")
    author_esc = p['author'].replace(r"\'", "'").replace("'", r"\'")

    lines.append(f"    title: '{title_esc}',")
    lines.append(f"    subtitle: '{subtitle_esc}',")
    lines.append(f"    summary: '{summary_esc}',")
    lines.append(f"    category: '{p['category']}',")
    lines.append(f"    categoryName: '{cat_name_esc}',")
    lines.append(f"    readMinutes: {p['readMinutes']},")
    lines.append(f"    datePublished: '{p['datePublished']}',")
    lines.append(f"    lastUpdated: '{p['lastUpdated']}',")
    lines.append(f"    author: '{author_esc}',")
    
    # Keywords
    kw_str = ", ".join(f"'{k.replace(r'\'', chr(39)).replace(chr(39), r'\'' )}'" for k in p['keywords'])
    lines.append(f"    keywords: [{kw_str}],")

    # Takeaways
    lines.append("    keyTakeaways: [")
    for t in p['keyTakeaways']:
        t_esc = t.replace(r"\'", "'").replace("'", r"\'")
        lines.append(f"      '{t_esc}',")
    lines.append("    ],")

    # Content Markdown (using backticks, escaping backticks and ${ within)
    content_esc = p['contentMarkdown'].replace("`", r"\`").replace("${", r"\${")
    lines.append(f"    contentMarkdown: `{content_esc}`,")

    # FAQ
    lines.append("    faq: [")
    for f in p['faq']:
        q_esc = f['q'].replace(r"\'", "'").replace("'", r"\'")
        a_esc = f['a'].replace(r"\'", "'").replace("'", r"\'")
        lines.append("      {")
        lines.append(f"        q: '{q_esc}',")
        lines.append(f"        a: '{a_esc}',")
        lines.append("      },")
    lines.append("    ],")

    # Links & relations
    lines.append("    relatedToolLinks: [")
    lines.append("      {")
    lines.append("        title: 'Cook Time Reference',")
    lines.append("        href: '/how-long',")
    lines.append("        description: 'Verified cook times, temperatures, and internal targets across all foods and appliances.',")
    lines.append("      },")
    lines.append("      {")
    lines.append("        title: 'Cooking Temperature Charts',")
    lines.append("        href: '/charts',")
    lines.append("        description: 'Comprehensive parametric temperature and resting charts.',")
    lines.append("      },")
    lines.append("    ],")
    lines.append("    relatedRecipeSlugs: [],")
    lines.append("    relatedDatasheetSlugs: [],")
    lines.append("  },")

lines.append("];")
lines.append("")

with open(output_path, "w") as f:
    f.write("\n".join(lines))

print(f"Successfully generated {output_path} with {len(all_posts)} posts.")
