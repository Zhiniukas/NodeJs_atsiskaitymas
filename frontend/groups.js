import { populateGroupList } from "./populateGroupList";

const accessToken = localStorage.getItem("accessToken");

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
    };


    console.log(result);

    populateGroupList(result)

} catch (error) {
    console.error(error);
}

