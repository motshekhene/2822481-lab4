document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

 const sSpinner=document.getElementById('loading-spinner');
 const eMessage=document.getElementById("error-message");

async function searchCountry(countryName) {
    try {
        // Show loading spinner
       
       sSpinner.classList.remove("hidden");

        // Fetch country data

      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
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
    let bordersHTML = '<p><strong>Bordering Countries:</strong></p>';

    for (let code of country.borders) {
        const response1 = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data1 = await response1.json();
        const bCountry = data1[0];

        bordersHTML = bordersHTML+`
            <p>${bCountry.name.common}</p>
            <img src="${bCountry.flags.svg}" alt="${bCountry.name.common} flag" width="50">
        `;
    }  
        
        // Update bordering countries section
         document.getElementById('bordering-countries').innerHTML = bordersHTML;
} else {
    document.getElementById('bordering-countries').innerHTML = '<p>No bordering countries.</p>';
}

        

    } catch (error) {
        // Show error message
        eMessage.textContent=error.message;
      

    } finally {
        // Hide loading spinner

        sSpinner.classList.add("hidden");

    }

}