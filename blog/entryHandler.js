function parseMD(markdown) {
    // Replace headings (e.g., # Heading 1)
    markdown = markdown.replace(/######(.+)/g, '<h6>$1</h6>');
    markdown = markdown.replace(/#####(.+)/g, '<h5>$1</h5>');
    markdown = markdown.replace(/####(.+)/g, '<h4>$1</h4>');
    markdown = markdown.replace(/###(.+)/g, '<h3>$1</h3>');
    markdown = markdown.replace(/##(.+)/g, '<h2>$1</h2>');
    markdown = markdown.replace(/#(.+)/g, '<h1>$1</h1>');
  
    // Replace bold (e.g., **bold**)
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Replace italic (e.g., *italic*)
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace ordered lists (e.g., 1. First item)
    markdown = markdown.replace(/^\s*\d+\. (.+)/gm, '<li class="ordered">$1</li>');
    markdown = markdown.replace(/(<li class="ordered">.*<\/li>\n?)+/g, '<ol>$&</ol>');
    // Replace unordered lists (e.g., - Item 1)
    markdown = markdown.replace(/^\s*- (.+)/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
    // Replace images (e.g., ![Alt Text](https://example.com/image.jpg))
    markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Replace links (e.g., [Link to Google](https://www.google.com))
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
    // Replace single-line code blocks (e.g., `code`)
    markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
  
    // Replace multi-line code blocks (e.g., ```code```)
    markdown = markdown.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');

    markdown = markdown.replace(/ {2}$/gm, '$&<br>')
  
    return markdown;
}

for (entry of Object.keys(entries)) {
    if (entries[entry][0] == document.getElementById("id").innerText) {
        title = document.createElement("h1")
        title.innerText = entry
        backToBlog = document.createElement("a")
        backToBlog.href = "../blog.html"
        backToBlog.innerText = "Back to blog"
        author = document.createElement("h2")
        author.className = "author"
        author.innerText = `William Choi-Kim, ${entries[entry][1]}`
        document.getElementById("heading").append(title, backToBlog, author)
        document.getElementById("content").innerHTML = parseMD(entries[entry][2])
        footer = document.createElement("footer")
        footer.innerHTML = `<small>© ${new Date().getFullYear()} William Choi-Kim. All Rights Reserved.</small>`
        document.body.appendChild(footer)
        document.getElementsByTagName("title")[0].innerText = `${entry} | William Choi-Kim`
    }
}