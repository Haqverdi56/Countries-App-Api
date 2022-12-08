const container = document.getElementById('container');
const searchInput = document.getElementById('search');
const selectValue = document.getElementById('region');

const url = "https://restcountries.com/v3.1/all";

axios.get(url)
.then( (res) => {
    fillData(res.data)
});

function fillData(datas) {
    datas.forEach(data=>{
        container.innerHTML += `
        <div class="inner-container">
                <div class="flags">
                    <img class="flag" src="${data?.flags?.svg}" alt="">
                </div>
                <div class="sub-container">
                    <p class="texts" class="country-name">${data?.name?.common}</p>
                    <p class="texts" class="population">Population: ${data?.population}</p>
                    <p class="texts" class="region">Region: ${data?.region}</p>
                    <p class="texts" class="capital">Capital: ${data?.capital}</p>
                </div>
        </div>`
    });
}

searchInput.addEventListener("input", function searching() {
    container.innerHTML = " ";
    console.log(searchInput.value)
    axios.get(`https://restcountries.com/v3.1/name/${searchInput.value}`)
      .then((res) => {
        fillData(res.data);
      }).catch((err) => {
        createError(err);
    });
});

function createError() {
    let createErrorElement = document.createElement("h1");
    createErrorElement.setAttribute("class", "error");
    createErrorElement.innerText = "Error";
    container.appendChild(createErrorElement);
}
  

selectValue.addEventListener('change', function() {
    container.innerHTML = " ";
    
    axios.get(`https://restcountries.com/v3.1/region/${selectValue.value}`)
      .then((res) => {
        fillData(res.data);
      }).catch((err) => {
        createError(err);
    });
})