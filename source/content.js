walk(document.body);

// replaces marked module codes in the HTML with the links to NUSMods
document.body.innerHTML = document.body.innerHTML.replace(/~[A-Za-z]{2,3}\s?[0-9]{4}[A-Za-z]?~/g, function (x) {
    x = x.slice(1, -1)
    link = "http://nusmods.com/modules/" + x.replace(/\s/g, "")
    html_to_return = '<a href=' + link + '>' + x + '</a>'
    return html_to_return
});

function walk(node) {
    // Taken from http://is.gd/mwZp7E

    var child, next;

    var tagName = node.tagName ? node.tagName.toLowerCase() : "";
    if (tagName == 'input' || tagName == 'textarea') {
        return;
    }
    if (node.classList && node.classList.contains('ace_editor')) {
        return;
    }

    switch (node.nodeType) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    var v = textNode.nodeValue;

    // marks out module codes by adding "~" to its start and end 
    // eg: "CS1010s" -> "~CS1010s~"
    //
    // this only replaces text content so we dont accidentally break links by 
    // replacing the html directly
    v = v.replace(/\b[A-Za-z]{2,3}\s?[0-9]{4}[A-Za-z]?\b/g, function (x) {
        if (x.slice(0, 2) == "AY") {
            return x
        }
        else {
            return "~" + x + "~"
        }
    })

    textNode.nodeValue = v;
}

