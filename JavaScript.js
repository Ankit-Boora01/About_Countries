const main = document.querySelector('main');
        const continentSelect = document.querySelector('#continent');
        

        async function searchName(){
            main.innerHTML = '';
            const searchByName = document.querySelector('#search').value;
            if (!searchByName) return;
            try{
            let apiName = `https://restcountries.com/v3.1/name/${searchByName}?fullText=true`;

            let respone = await fetch(apiName);

            let data = await respone.json();

            data.forEach((country)=>{
                    createCards(country);
                })}
                catch (err) {
                console.error(err);
            }

            

        }
        
        async function allCountries(continent = 'all') {
            main.innerHTML = '';
            try {
                let apiRegion = continent === 'all' 
                    ? 'https://restcountries.com/v3.1/all' 
                    : `https://restcountries.com/v3.1/region/${continent}`;
        
                const url = await fetch(apiRegion);
                let data = await url.json();

                data.forEach((country)=>{
                    createCards(country);
                })
        
               
        
            } catch (err) {
                console.error(err);
            }
        }


        function createCards(country){
            const card = document.createElement('a');
            card.id = 'cards';
            card.href = `/country.html?name=${country.name.common}`;
            main.append(card);

            const img = document.createElement('img');
            img.id = 'country-img';
            img.src = country.flags.png;
            img.style.width = '300px';
            img.style.height = '200px';
            card.appendChild(img);

            const div = document.createElement('div');
            div.id = 'country-detials';
            card.appendChild(div);

            const h2 = document.createElement('h2');
            h2.id = 'country';
            h2.innerText = country.name.common;
            div.appendChild(h2);

            const p1 = document.createElement('p');
            p1.id = 'population';
            p1.innerText = "Population: ";
            div.appendChild(p1);
            const span1 = document.createElement('span');
            span1.id = 'pop-Count';
            span1.innerText = country.population.toLocaleString();
            p1.appendChild(span1);

            const p2 = document.createElement('p');
            p2.id = 'region';
            p2.innerText = 'Region: ';
            div.appendChild(p2);
            const span2 = document.createElement('span');
            span2.id = 'reg-Name';
            span2.innerText = country.region;
            p2.appendChild(span2);

            const p3 = document.createElement('p');
            p3.id = 'capital';
            p3.innerText = 'Capital: ';
            div.appendChild(p3);
            const span3 = document.createElement('span');
            span3.id = 'cap-Name';
            span3.innerText = country.capital ? country.capital[0] : 'N/A';
            p3.appendChild(span3);

        }
        
        allCountries();
        
        continentSelect.addEventListener('change', function () {
            allCountries(this.value);
        });


        