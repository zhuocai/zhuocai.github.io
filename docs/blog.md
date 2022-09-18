---
layout: page
title: Blog
permalink: /blog/
---


<div>
<ul class="post-list">
<li>
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
<span class="post-meta">Aug 30, 2022 </span>
<h3>
    <a class="post-link" href="/blog/2022-08-30-publicly-verifiable-secret-sharing.html">
    Publicly Verifiable Secret Sharing
    </a>
</h3>
{%- if site.show_excerpts -%}
    {{ post.excerpt }}
{%- endif -%}
</li>
</ul>
</div>