const wrapper = document.querySelector('.wrapper'),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
infoText = wrapper.querySelector(".info-text"),
synonym = wrapper.querySelector(".synonyms .list"),
removeIcon = wrapper.querySelector(".search span");

let audio;

// console.log("object")
function data(result, word){
    if (result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>.
        Please, try to search another word or check your spelling`
    }else{
        console.log("object")
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`
        document.querySelector(".word p").innerHTML = result[0].word
        document.querySelector(".word span").innerText = phontetics
        document.querySelector(".meaning span").innerText = definitions.definitions
        document.querySelector(".exapmle span").innerText = definitions.example
        
        audio = new Audio("https:" + result[0].phonetics[0].audio)
        if(definitions.synonym[0] == undefined){
            synonym.parentElement.style.display = "none"
        }else{
            synonym.parentElement.style.display = "block"
            synonym.innerHTML =""
            for (let i = 0;i<5;i++){
                let tag = `<span onclick="search('${definitions.synonym[i]}')">${definitions.synonym[i]},</span>`
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonym[i]}')">${definitions.synonym[4]}</span>`: tag;
                synonym.insertAdjacentHTML("beforeend" , tag)
            }
        }
    }
}

function search(word){
    console.log("object")
    fetchApi(word)
    searchInput.value = word
}

function fetchApi(word){
    console.log("object")
    wrapper.classList.remove("active")
    infoText.style.color = "#000"
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`

    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(response => response.json()).then(result => 
        data(result , word)).catch(()=>{
            infoText.innerHTML = `Can't find the meaning of
            <span>"${word}"</span>. Please search another word
            or check your spelling`})
}
