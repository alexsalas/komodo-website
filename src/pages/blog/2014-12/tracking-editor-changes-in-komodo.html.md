---
title: Tracking Editor Changes in Komodo 9
author: Eric Promislow
date: 2014-12-22
tags: [editor, revert, highlight, changes]
description: Discover how the Komodo 9 Track Changes component went from a nice to have feature into a must-have!
layout: blog
---

A change-tracker has been a common item on the Komodo wish-list for about as
long as there's been a Komodo editor. I had seen this feature in other editors,
and was originally underwhelmed - I wanted to make sure the Komodo track changes
feature was more useful to developers.

The first screenshot shows how the tracker margin indicates lines with a green
bar to show additions, red bars to show deletions, and blue to show in-place
changes.

<img src="/images/blog/2014-12/track-changes-01.png" alt="colored margins show which editor lines have changed">

Note that these margins will include Source Code Control (SCC) changes when the
file is under revision control. I had originally added preferences to control
whether it should show changes against the revision control system or just the
saved instance on disk, but later found these preferences were not really
needed. If the document is in SCC, the tracker shows changes against the
repository, otherwise it shows the unsaved changes compared to what is on disk.

While we're mentioning colors, you can configure which ones are displayed in
the margins at *Preferences > Color Schemes > Colors* and modify the *Track
changes...* values.

<img src="/images/blog/2014-12/track-changes-colors.png" alt="preference colors">

But I still didn't find this feature very compelling. But then I realized we
had a powerful addition to the suite of tools you get by using SCC: the ability
to view and revert individual changes in a document. For example, I clicked on
the blue margin at line 41 of the document displayed in the images. That
displayed a popup panel with the deleted text in red, and the new text in
green. I could then press the "Revert Change" button to throw away that one
particular change, but not affect the other changed parts of the documents. And
this being Komodo 9, I could also share the change via
<a href="http://kopy.io/">Kopy.io</a> with a  single click.

<img src="/images/blog/2014-12/show-change-03.png" alt="showing localized changes">

And what I had previously regarded as a "checklist feature" has become a tool I
find indispensable, in particular when I start working on a codebase that's new
to me. Now when I'm working on unfamiliar code I can deliberately do too much
work, such as adding soon-to-be superfluous logging statements, de-obfuscation
of code (say breaking one 200-character line of code into 4 clear statements).
Then once my code passes tests, I can now easily revert the blocks of code I no
longer need, leaving just the (hopefully) small number of changes to check in.

The next screenshot shows what happens after I revert the change block at
line 41.  If I then decide I want to keep it, I can get it back by doing Undo.
     
<img src="/images/blog/2014-12/track-changes-04.png" alt="reverting a change">

And with that one addition, this feature went from being something I thought
would look good in a product review checklist to something I use every day.

