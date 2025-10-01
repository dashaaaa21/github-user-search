async function fetchUser(login) {
    const avatar = document.getElementById("avatar");
    const nameEl = document.getElementById("name");
    const loginOut = document.getElementById("loginOut");
    const htmlUrl = document.getElementById("html_url");
    const locationEl = document.getElementById("location");
    const emailEl = document.getElementById("email");
    const followersEl = document.getElementById("followers");
    const followingEl = document.getElementById("following");
    const message = document.getElementById("message");


    avatar.style.display = "none";
    nameEl.textContent = loginOut.textContent = htmlUrl.textContent = locationEl.textContent = emailEl.textContent = "-";
    followersEl.textContent = followingEl.textContent = "-";
    message.textContent = "";

    if (!login) {
        message.textContent = "Введіть логін.";
        return;
    }

    message.textContent = "Завантаження...";

    try {
        const res = await fetch(`https://api.github.com/users/${login}`);
        if (!res.ok) {
            message.textContent = "Користувача не знайдено.";
            return;
        }

        const data = await res.json();
        if (data.avatar_url) {
            avatar.src = data.avatar_url;
            avatar.style.display = "block";
        }

        nameEl.textContent = data.name || "Немає даних";
        loginOut.textContent = data.login || "Немає даних";
        htmlUrl.innerHTML = data.html_url ? `<a href="${data.html_url}" target="_blank">${data.html_url}</a>` : "Немає даних";
        locationEl.textContent = data.location || "Немає даних";
        emailEl.textContent = data.email || "Немає даних";
        followersEl.textContent = data.followers ?? "Немає даних";
        followingEl.textContent = data.following ?? "Немає даних";
        message.textContent = "";
    } catch (err) {
        message.textContent = "Сталася помилка!";
    }
}

document.getElementById("searchBtn").addEventListener("click", () => {
    fetchUser(document.getElementById("login").value.trim());
});

document.getElementById("exampleBtn").addEventListener("click", () => {
    document.getElementById("login").value = "dashaaaa21";
    fetchUser("dashaaaa21");
});