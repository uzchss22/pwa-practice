document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('add-column').addEventListener('click', addColumn);
document.getElementById('copy-markdown').addEventListener('click', copyMarkdown);
document.getElementById('data-table').addEventListener('input', updateMarkdown);

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
        let row = '';
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            row += table.rows[i].cells[j].innerText + (j < table.rows[i].cells.length - 1 ? ' | ' : '');
        }
        markdown += row + '\n';
        if (i === 0) {
            markdown += table.rows[0].cells.map(() => '---').join(' | ') + '\n';
        }
    }
    document.getElementById('markdown-output').value = markdown;
}

function copyMarkdown() {
    const markdownOutput = document.getElementById('markdown-output');
    markdownOutput.select();
    document.execCommand('copy');
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
