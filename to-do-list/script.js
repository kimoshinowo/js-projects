// Add new task
function addNewTask() {
    var inputValue = document.getElementById("listInput").value;
    if (inputValue.length != 0) {
        // Create cross
        const cross = document.createElement('span');
        const crossNode = document.createTextNode('✖');
        cross.appendChild(crossNode);
        cross.classList.add("cross");
        // Create list element
        var li = document.createElement('li');
        var node = document.createTextNode(inputValue);
        li.appendChild(node);
        li.appendChild(cross);
        document.getElementsByTagName('ul')[0].appendChild(li);
        document.getElementsByTagName('ul')[0].value = "";
    } else {
        alert("You can't add an empty item!"); 
    }
}

// Check off task
var list = document.querySelector('ul');
list.addEventListener('click', function(e) {
    if (e.target.tagName == 'LI') {
        e.target.classList.toggle('checked');
    }
});

// Remove task
list.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('cross')) {
        ev.target.parentElement.style.display='none'; 
    }
});
