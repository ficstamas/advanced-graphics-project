# advanced-graphics-project
Project for the Advanced Graphical Algorithms course<br>
Tested under Firefox 74.0 (64-bit)

## Pre-requirements under Firefox

Because of the changes according to CVE-2019-11730, under Firefox we have to change a flag to not threat the `file:///` URI as unique origin by CORS.

Copy `about:config` in to the URL bar<br>
and set <br> 
`privacy.file_unique_origin=False`