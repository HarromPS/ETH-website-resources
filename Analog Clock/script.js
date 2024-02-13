
setInterval((e) => {
    let d = new Date();
    console.log(d.getHours(), d.getMinutes(), d.getSeconds());

    let hr_rotate = (d.getHours() * 30) + (d.getMinutes() / 2);
    let min_rotate = d.getMinutes() * 6;
    let sec_rotate = d.getSeconds() * 6;

    document.getElementById("hours").style.transform = `rotate(${hr_rotate}deg)`;;
    document.getElementById("minutes").style.transform = `rotate(${min_rotate}deg)`;
    document.getElementById("seconds").style.transform = `rotate(${sec_rotate}deg)`;;
}, 1000);