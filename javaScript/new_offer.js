let tag_input = document.getElementById("input-line-tag");
let tag_output = document.getElementById("tags-block");

function resetTags(){
    tag_output.innerHTML="";
}

function addTag(){
    let text = tag_input.value;
    let text_node = document.createTextNode(text);
    let new_tag = document.createElement("div");
    new_tag.appendChild(text_node);
    tag_output.appendChild(new_tag);
    tag_input.value = "";
}