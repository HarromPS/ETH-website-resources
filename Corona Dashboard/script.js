// Using fetch api


function updateData() {
	let promise = fetch("/data.json");
	promise.then(response => response.json())
		.then(res => {
			// get the location of infected & display on the map

			// using MAP box
			res.data.forEach((ele) => {
				let infected = ele.infected;
				let latitude = ele.latitude;
				let longitude = ele.longitude;

				let col = '';
				if (infected > 800) {
					col = "#FF0000";
				}
				else if (infected > 400 && infected < 800) {
					col = "#ff8205";
				}
				else if (infected > 0 && infected < 400) {
					col = "#5bff09";

				}
				else {
					col = "	#ffffff";

				}
				// Set marker options.
				const marker = new mapboxgl.Marker({
					color: `${col}`,
					draggable: false
				}).setLngLat([longitude, latitude])
					.addTo(map);
			});
		});
	// console.log(res);
}

updateData();


// const url = 'https://coronavirus-news-live.p.rapidapi.com/news/guardian';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'f2fdf697cdmsheeb542c280092bap184ad6jsnd9637f5b7409',
// 		'X-RapidAPI-Host': 'coronavirus-news-live.p.rapidapi.com'
// 	  }
// };


// const promise = fetch(url, options);
// promise.then((response)=>{
// 	return response.json();
// }).then((response=>{
// 	console.log(response);
// }));

// // Hariom999#
