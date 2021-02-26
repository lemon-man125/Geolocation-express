async function getData() {
    const result = await fetch('/data');
    const data = await result.json();
    console.log(data);
}

getData();