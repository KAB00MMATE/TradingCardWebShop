let tag_input = document.getElementById("input-line-tag");
let tag_output = document.getElementById("tags-block");
let id_counter = 0;

function resetTags(){
    tag_output.innerHTML="";
}

function addTag(){
    let text = tag_input.value;

    if (text == ""){
        return;
    }
    // let text_node = document.createTextNode(text);
    // let new_tag = document.createElement("div");
    // new_tag.appendChild(text_node);

    new_tag = createTag(text);

    tag_output.appendChild(new_tag);
    tag_input.value = "";
}

function createTag(text){
    const new_tag = document.createElement("div")
    new_tag.id = "tag" + id_counter;
    new_tag.class = "tag"
    const input = document.createElement("input");
    input.type="text";
    input.name = "tags";
    input.id = "tag" + id_counter;
    input.value = text;

    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Delete";
    button.id = "tag" + id_counter;
    button.onclick = deleteTag;

    new_tag.appendChild(input);
    new_tag.appendChild(button);

    id_counter++
    return new_tag;
}

function deleteTag(){
    const toRemove = document.getElementById(this.id);
    tag_output.removeChild(toRemove);
}   