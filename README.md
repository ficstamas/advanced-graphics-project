# advanced-graphics-project
Project for the Advanced Graphics course

## Pre-requirements under Firefox

Becouse of the changes according to CVE-2019-11730, under Firefox we have to change a flag to not threat the `file:///` URI as unique origin by CORS.

Copy `about:config` in to the URL bar<br>
and set <br> 
`privacy.file_unique_origin=False`