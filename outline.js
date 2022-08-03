async function getHTML(url) {
    const res = await fetch(url);
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc
}
async function reloadContent() {
    const doc = await getHTML(window.location.href);
    document.body.innerHTML = doc.body.innerHTML
}
reloadContent()