import { populateGroupList } from "./populateGroupList.js";

const accessToken = localStorage.getItem("accessToken");

document.getElementById("ifAuthed").style.display = "none";

try {
    const response = await fetch("http://localhost:5001/groups", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    })

    const result = await response.json();

    if (!response.ok || response.status >= 400) {
        alert(result?.error || response.statusText)

    } else {

        document.getElementById("ifAuthed").style.display = "inline";
        document.getElementById("ifNotAuthed").style.display = "none";

        populateGroupList(result);
    };

} catch (error) {
    console.error(error);
}

const createNewGroup = document.querySelector("form#newGroupForm")
createNewGroup.addEventListener("submit", async (event) => {
    event.preventDefault();

    const groupName = document.querySelector("#groupName").value.trim();

    try {
        const response = await fetch("http://localhost:5001/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ name: groupName })

        })

        const result = await response.json();

        if (!response.ok || response.status >= 400) {
            return alert(result?.error || response.statusText)
        } else {

            location.reload();
        };

    } catch (error) {
        if (error.status = 409) {
            return alert(`This group already exists!`)
        }
        return console.error(error);
    }
})