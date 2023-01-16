let tag_input = document.getElementById("input-line-tag");
let tag_output = document.getElementById("tags-block");

function addTag(){
    const new_tag = document.createElement("p");
    new_tag.appendChild(document.createTextNode(tag_input.value));
    // tag_input.append(new_tag);

    document.body.insertBefore(new_tag, tag_output);


    alert("yo");
}