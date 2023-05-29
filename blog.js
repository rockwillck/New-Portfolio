const entries = {"Rendering Metaballs in Real Time in the Browser": "metaballs"}
for (entryTitle of Object.keys(entries)) {
    entryEl = document.createElement("a")
    entryEl.href = `blogs/${entries[entryTitle]}.html`
    entryEl.innerText = entryTitle
    document.getElementById("entries").appendChild(entryEl)
}