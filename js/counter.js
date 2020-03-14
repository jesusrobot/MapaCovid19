renderData();

async function getData() {
    const res = await fetch('https://covid19.mathdro.id/api');
    const data = await res.json();
    return data;
}

async function renderData() {

    const data = await getData();
    console.log(data);  
    
    document.getElementById('number-infectados').innerText = data.confirmed.value;
    document.getElementById('number-recuperados').innerText = data.recovered.value;
    document.getElementById('number-muertos').innerText = data.deaths.value;

    
}