document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

 const sSpinner=document.getElementById('loading-spinner');
 const bCont=document.getElementById('bordering-countries');
 const countries=document.getElementById('country-info');
 const eMessage=document.getElementById("error-message");



async function searchCountry(countryName) {
    try {

        bCont.innerHTML="";
        countries.innerHTML="";
        eMessage.innerText="";


        // Show loading spinner
       
       sSpinner.classList.remove("hidden");

        // Fetch country data

      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      const data = await response.json();
      const country = data[0];



        // Update DOM

        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
    `;

        // Fetch bordering countries

        if (country.borders && country.borders.length > 0) {
    let bordersHTML = '<p><strong>Bordering Countries:</strong></p>';  //declared outside for loop because inner.html overides the border countries and only leaves the last one

    for (let code of country.borders) {
        const response1 = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data1 = await response1.json();
        const bCountry = data1[0];


        //appending neighbouring countries
        bordersHTML = bordersHTML+`                      
            <p>${bCountry.name.common}</p>
            <img src="${bCountry.flags.svg}" alt="${bCountry.name.common} flag" width="30">
        `;
    }  
        
        // Update bordering countries section
         document.getElementById('bordering-countries').innerHTML = bordersHTML;
} else {
    document.getElementById('bordering-countries').innerHTML = '<p>This country does not have any neighbours.</p>';
}

        

    } catch (error) {
        // Show error message
        eMessage.textContent=error.message;
      

    } finally {
        // Hide loading spinner

        sSpinner.classList.add("hidden");

    }

}