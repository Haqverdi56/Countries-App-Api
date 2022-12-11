const main = document.getElementById('main')

const url = "https://restcountries.com/v3.1/all";

function getData(){
    axios.get(url)
    .then( (res) => {
        fillData(res.data)
    });
}

getData()

function fillData(datas) {
    datas.forEach(data=>{
        main.innerHTML += `
        <div id="detail-flag"><img src="${data.flags.svg}" alt=""></div>
        <div id="detail-info">
            <h1>Belgium</h1>
            <div id="sub-detail">
                <div>
                    <h4>Native Name: <span>Belgie</span></h4>
                    <h4>Population: <span>11,319,511</span></h4>
                    <h4>Region: <span>Europe</span></h4>
                    <h4>Sub Region: <span>Western Europe</span></h4>
                    <h4>Capital: <span>Brussels</span></h4>
                </div>
                <div>
                    <h4>Top Level Domain: <span>be</span></h4>
                    <h4>Currencies: <span>Euro</span></h4>
                    <h4>Languages: <span>Dutch, French, German</span></h4>
                </div>
            </div>
            <div>
                <h4>Border Countries: <span>France, German, Netherlands</span></h4>
            </div>
        </div>`
    });
    
}