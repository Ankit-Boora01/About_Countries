const countryUrl = new URLSearchParams(location.search).get('name');   
     const countryImg = document.querySelector('#country-img');
     const countryName = document.querySelector('#country-name');
     const countryNativeName = document.querySelector('#c-NavtiveName');
     const countryPop = document.querySelector('#c-Population');
     const countryRegion = document.querySelector('#c-Region');
     const countrySubRegion = document.querySelector('#c-SubRegion');
     const countryCapital = document.querySelector('#c-CaptialName');
     const countryDomain = document.querySelector('#c-Domain');
     const countryCurrency = document.querySelector('#c-Currency');
     const countryLanguage = document.querySelector('#c-Language');
     const countryBorderBold = document.querySelector('#c-Borders');
     


     

     async function countryPageDetials(name) {
         try {
             let api = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
             let response = await api.json();
             let data = response;
             console.log(data);

             countryImg.src = data[0].flags.png;
             countryName.textContent = data[0].name.common;

             if (data[0].name.nativeName) {
                 countryNativeName.textContent = data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common;
             } else {
                 countryNativeName.textContent = data[0].name.common;
             }

             countryPop.textContent = data[0].population.toLocaleString();
             countryRegion.textContent = data[0].region;
             countrySubRegion.textContent = data[0].subregion;
             countryCapital.textContent = data[0].capital;

             if (data[0].borders) {
                 let borderApi = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`);
                 let bordersResponse = await borderApi.json();

                 const fragment = document.createDocumentFragment();
                 bordersResponse.forEach(border => {
                     const countryBorderLink = document.createElement('a');
                     countryBorderLink.textContent = border.name.common;
                     countryBorderLink.href = `country.html?name=${border.name.common}`;
                     fragment.appendChild(countryBorderLink);
                 });
                 countryBorderBold.appendChild(fragment);
             } else {
                 countryBorderBold.textContent += " No neighboring countries found!";
             }

             countryDomain.textContent = data[0].tld.join(',');
             if (data[0].currencies) {
                 countryCurrency.textContent = Object.values(data[0].currencies).map(currency => currency.name).join(', ');
             } else {
                 countryCurrency.textContent = "No currency Found!";
             }
             if (data[0].languages) {
                 countryLanguage.textContent = Object.values(data[0].languages).join(', ');
             } else {
                 countryLanguage.textContent = "No Language Found!";
             }
         } catch (err) {
             console.error("Error:", err);
         }
     }

     countryPageDetials(countryUrl);

     
        