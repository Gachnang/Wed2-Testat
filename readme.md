# Buttons Path
  * Create new Note -> /notes/new
    * GET: empty form
    * POST: add new note
  * Exit            -> /notes/edit/bvHo...
    * GET: show note
    * PUT: update (btn: save)
  * By Importance     -> /?orderBy=importance
  * Fertige verbergen -> /?filter=true
  * Alle anzeigen     -> /?filter=false
  * Style Switcher    -> /?style=black
  * Style Switcher    -> /?style=white







# DB Struktur
```
{
    "title":"Einkaufen",
    "description":"Butter\n6 Eier\n1kg Mehl\nHefeblock\nKopfsalat\nTomaten",
    "finished":false,
    "importance":1,
    "date":{"$$date":1538934387888},
    "created":{"$$date":1538934387888},
    "_id":"eineineinkaufen"
}
```
