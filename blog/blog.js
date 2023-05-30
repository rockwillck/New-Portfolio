for (entryTitle of Object.keys(entries)) {
    entryEl = document.createElement("a")
    entryEl.href = `entries/${entries[entryTitle][0]}.html`
    entryEl.innerText = entryTitle
    subTitle = document.createElement("sub")
    subTitle.innerText = entries[entryTitle][1]
    document.getElementById("entries").appendChild(entryEl)
    document.getElementById("entries").appendChild(document.createElement("br"))
    document.getElementById("entries").appendChild(subTitle)
}