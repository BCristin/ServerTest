window.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	function req(e) {
		e.preventDefault();

		let formData = new FormData(form);
		formData.append("id", Math.random());

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});
		// let json = JSON.stringify(obj);

		// // json-server db.json pt pornire server
		// const request = new XMLHttpRequest();
		// request.open("POST", "http://localhost:3000/people"); // configuram cererea
		// request.setRequestHeader(
		// 	"Content-type",
		// 	"application/json; charset=utf-8;"
		// );
		// request.send(json); // daca postam ceva pune in paranteza data
		// request.addEventListener("load", function () {
		// 	//"readystatechange" verifica toate schimbarile

		// 	if (request.status == 200) {
		// 		let data = JSON.parse(request.response);
		// 		console.log(data);
		// 		// createCards(data);
		// 	} else {
		// 		console.error("ceva nu a mers bine");
		// 	}
		// });
		// getResource("http://localhost:3000/people", obj)

		getResource("./api.php", formData)
			.then((data) => console.log(data))
			.catch((err) => console.error(err));
		// this.remove();
	}
	form
		// .querySelector("button")
		.addEventListener("submit", (e) => req(e), { once: true });

	async function getResource(url, data) {
		const res = await fetch(`${url}`, {
			method: "POST",
			// headers: { "Content-type": "multipart/form-data" },
			body: data,
		});

		if (!res.ok) {
			throw new Error(`could not fetch ${url},status: ${res.status}`);
		}
		return await res.text();
	}
	// async function getResource(url) {
	// 	const res = await axios(`${url}`);
	// 	if (res.status !== 200) {
	// 		throw new Error(`could not fetch ${url},status: ${res.status}`);
	// 	}
	// 	return res;
	// }

	function createCards(response) {
		response.forEach((item) => {
			let card = document.createElement("div");
			card.classList.add("card");
			let icon;
			if (item.sex == "male") {
				icon = "icons/mars.png";
			} else {
				icon = "icons/female.png";
			}
			card.innerHTML = `
            <img src="${item.photo}" alt="photo">
            <div class="name">${item.name} ${item.surname}</div>
            <div class="sex"><img src=${icon} alt="male"></div>
            <div class="age">${item.age}</div>
            `;
			document.querySelector(".app").appendChild(card);
		});
	}
});
