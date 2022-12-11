const container = document.getElementById('container');
const searchInput = document.getElementById('search');
const selectValue = document.getElementById('region');


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
        container.innerHTML += `
        <div name=${data.name.common} class="inner-container" onclick="func()">
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
function func(e) {
    // localStorage.setItem("idd", num)
    console.log(e)
}

searchInput.addEventListener("input", function searching() {

    if(searchInput.value === '') {
        container.innerHTML = " ";
        getData();
        return
    }

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
    container.innerHTML = " ";
    let createErrorElement = document.createElement("h1");
    createErrorElement.setAttribute("class", "error");
    createErrorElement.innerText = "Error";
    container.appendChild(createErrorElement);
}

selectValue.addEventListener('change', function() {
    container.innerHTML = " ";
    // console.log(selectValue.value)
    if(selectValue.value === 'all') {
        container.innerHTML = " ";
        getData();
        return
    }
    axios.get(`https://restcountries.com/v3.1/region/${selectValue.value}`)
      .then((res) => {
        fillData(res.data);
      }).catch((err) => {
        createError(err);
    });
})



