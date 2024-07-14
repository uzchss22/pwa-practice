// File: /script.js
document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('add-column').addEventListener('click', addColumn);
document.getElementById('copy-markdown').addEventListener('click', copyMarkdown);
document.getElementById('data-table').addEventListener('input', updateMarkdown);
document.getElementById('align-left').addEventListener('click', () => setAlignment('left'));
document.getElementById('align-center').addEventListener('click', () => setAlignment('center'));
document.getElementById('align-right').addEventListener('click', () => setAlignment('right'));

let alignment = 'left';

function addRow() {
    const table = document.getElementById('data-table');
    const newRow = table.insertRow();
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        const newCell = newRow.insertCell();
        newCell.contentEditable = "true";
    }
    updateMarkdown();
}

function addColumn() {
    const table = document.getElementById('data-table');
    for (let i = 0; i < table.rows.length; i++) {
        const newCell = table.rows[i].insertCell();
        newCell.contentEditable = "true";
    }
    updateMarkdown();
}

function updateMarkdown() {
    const table = document.getElementById('data-table');
    let markdown = '';
    
    for (let i = 0; i < table.rows.length; i++) {
        let row = [];
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            row.push(table.rows[i].cells[j].innerText);
        }
        markdown += row.join(' | ') + '\n';
        if (i === 0) {
            const alignments = {
                left: ':---',
                center: ':---:',
                right: '---:'
            };
            const headerSeparator = Array(table.rows[i].cells.length).fill(alignments[alignment]).join(' | ');
            markdown += headerSeparator + '\n';
        }
    }

    document.getElementById('markdown-output').value = markdown;
}

function setAlignment(newAlignment) {
    alignment = newAlignment;
    updateMarkdown();
}

function copyMarkdown() {
    const markdownOutput = document.getElementById('markdown-output');
    markdownOutput.select();
    document.execCommand('copy');
    showCopyMessage();
}

function showCopyMessage() {
    const message = document.createElement('div');
    message.textContent = 'Copied to clipboard!';
    message.style.position = 'fixed';
    message.style.bottom = '20px';
    message.style.right = '20px';
    message.style.padding = '10px';
    message.style.backgroundColor = 'green';
    message.style.color = 'white';
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.removeChild(message);
    }, 2000);
}

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}
