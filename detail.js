const main = document.getElementById('main')
let backBTN = document.querySelector(".btn-back")

const url = "https://restcountries.com/v3.1/name/";
const countryName = localStorage.getItem('countryName')

async function getData(){
    await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => {
        // console.log(res.data[0])
        fillData(res.data)
    });
}

getData()

function fillData(datas) {
    datas.forEach(data=>{
        let borders = data.borders;
        
        main.innerHTML += `
        <div id="detail-flag"><img src="${data.flags.svg}" alt=""></div>
        <div id="detail-info">
            <h1>${data.name.common}</h1>
            <div id="sub-detail">
                <div>
                    <h4>Native Name: <span>${data?.name?.nativeName?.spa?.common || data.name.common}</span></h4>
                    <h4>Population: <span>${data.population}</span></h4>
                    <h4>Region: <span>${data.region}</span></h4>
                    <h4>Sub Region: <span>${data.subregion}</span></h4>
                    <h4>Capital: <span>${data.capital}</span></h4>
                </div>
                    <div>
                    <h4>Top Level Domain: <span>be</span></h4>
                    <h4>Currencies: <span>${Object.entries(data.currencies)[0][0]}</span></h4>
                    <h4>Languages: <span>${Object.entries(data.languages)[0]}</span></h4>
                </div>
            </div>
            <div class="bordersDiv">

            </div>
        </div>`
                
                // BORDERS  
                
        let bordersList = "Border Countries:"
        let btnBorders = document.querySelectorAll(".btn-border");
        if (borders) {
            borders.forEach(element => {
                bordersList += `
                <div class="borders-btns">
                    <button class="btn btn-border">${element}</button>
                </div>`
            });
        }
        btnBorders.forEach((btnBorder) => {
            console.log(btnBorder);
            btnBorder.addEventListener("click", function () {
                let borderCountry = btnBorder.innerHTML
                    fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            fillData(data[0].name.official)
                        }
                        )
            })
        })

        backBTN.addEventListener("click", function () {
            window.location = "./index.html"
        })
    });
}