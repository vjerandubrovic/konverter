let tableDOM = document.getElementById("tablica");

let selectDOM = document.getElementById("valute");

let iznosDOM = document.getElementById("iznos");

let buttonDOM = document.getElementById("convert");


let getXMLFile = function(path, callback){
    console.log(path);
    let request = new XMLHttpRequest();
    
    request.open("GET", path);
    request.setRequestHeader("Content-Type", "text/xml");

    
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            callback(request.responseXML);
            console.log(request.responseXML);
        }
    };
    request.send();
};

const XMLdoc = (file) => {

    return new Promise(resolve  => {

        getXMLFile(file, function(xml){

            resolve(xml);

            //console.log(xml);           

        });    

    });

}

async function xmlTecajnaLista(){

    let tableR, tableD, tableRDOM, optionSelect;
    
    X_ML = await XMLdoc("tecaj.xml");

        
        let datum = X_ML.getElementsByTagName("datum_primjene");

        let valuta = X_ML.getElementsByTagName("valuta");

        let jedinica = X_ML.getElementsByTagName("jedinica");

        let kupovni_tecaj = X_ML.getElementsByTagName("kupovni_tecaj");

        let srednji_tecaj = X_ML.getElementsByTagName("srednji_tecaj");

        let prodajni_tecaj = X_ML.getElementsByTagName("prodajni_tecaj");
        
        for (let i = 0; i < datum.length; i++) {
            
            // kreiranje elementa row od tablice
            tableR = document.createElement("tr");
            // dajemo mu atribut id
            tableR.id = "row"+i;
            // dodajemo elementu s id=tablica sto smo gore kreirali (row)
            tableDOM.appendChild(tableR);
            // uhvacamo element koji smo gore kreirali preko atributa(id-a) row
            tableRDOM = document.getElementById("row"+i)

            // DATUM

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = datum[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)
            tableRDOM.appendChild(tableD);

            // VALUTA

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = valuta[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)
            tableRDOM.appendChild(tableD);
            
            optionSelect = document.createElement("option");

            optionSelect.innerHTML = valuta[i].childNodes[0].nodeValue;

            selectDOM.appendChild(optionSelect);

            // JEDINICA

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = jedinica[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)
            tableRDOM.appendChild(tableD);

            // KUPOVNI

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = kupovni_tecaj[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)

            tableD.className = "kupovni";

            tableRDOM.appendChild(tableD);

            // SREDNJI

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = srednji_tecaj[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)

            tableD.className = "srednji";

            tableRDOM.appendChild(tableD);

            // PRODAJNI

            // kreiranje elementa cell od tablice
            tableD = document.createElement("td");
            // ubacujemo mu text
            tableD.innerHTML = prodajni_tecaj[i].childNodes[0].nodeValue;
            // dodajemo elementu s id=row sto smo kreirali gore (cell)

            tableD.className = "prodajni";

            tableRDOM.appendChild(tableD);
            
        };

};

async function Convert(){
    
    await xmlTecajnaLista();

    let tableRow, tableData, tableRowDOM;

    let kupovniTecaj = document.querySelectorAll('.kupovni');

    let srednjiTecaj = document.querySelectorAll('.srednji');

    let prodajniTecaj = document.querySelectorAll('.prodajni');

    let valuta = X_ML.getElementsByTagName("valuta");

    function novaTablica(){

        let tablica = document.createElement("table");
        tablica.id = "prikaz";
        document.querySelector(".container").appendChild(tablica);
        return document.getElementById("prikaz");

    }

    function removeTablica(){

        let tablica = document.getElementById("prikaz");

        if(tablica != null){

            tablica.parentNode.removeChild(tablica);
        }
        

    }

    function calculate(){

        let izracun_kupovni, izracun_srednji, izracun_prodajni;

        let odabranaValuta = selectDOM.selectedIndex;

        let kolicina = parseFloat(iznosDOM.value);

        let kupovni_array =[];

        let srednji_array = [];

        let prodajni_array = [];

        let prikazDOM = novaTablica();


        kupovniTecaj.forEach(e => {
            
            let el = e.innerHTML;
            
            let ele = el.replace("," , ".");
            
            parseFloat(ele);

            kupovni_array.push(ele);
                
        });

        srednjiTecaj.forEach(e => {
            
            let el = e.innerHTML;
            
            let ele = el.replace("," , ".");
            
            parseFloat(ele);

            srednji_array.push(ele);
                
        });

        prodajniTecaj.forEach(e => {
            
            let el = e.innerHTML;
            
            let ele = el.replace("," , ".");
            
            parseFloat(ele);

            prodajni_array.push(ele);
                
        });

        

            for (let index = 0; index < kupovni_array.length; index++) {
                
                izracun_kupovni = kolicina * kupovni_array[odabranaValuta] / kupovni_array[index];

                izracun_srednji = kolicina * srednji_array[odabranaValuta] / srednji_array[index];

                izracun_prodajni = kolicina * prodajni_array[odabranaValuta] / prodajni_array[index];

                if(izracun_kupovni == kolicina  || isNaN(izracun_kupovni));
                else{
                
                    tableRow = document.createElement("tr");

                    tableRow.id = "prikaz"+index;

                    prikazDOM.appendChild(tableRow);

                    tableRowDOM = document.getElementById("prikaz"+index)
                    //

                    tableData = document.createElement("td");

                    tableData.innerHTML = valuta[index].childNodes[0].nodeValue;

                    tableRowDOM.appendChild(tableData);

                    //
                    tableData = document.createElement("td");

                    tableData.innerHTML = izracun_kupovni;

                    tableRowDOM.appendChild(tableData);

                    //
                    tableData = document.createElement("td");

                    tableData.innerHTML = izracun_srednji;

                    tableRowDOM.appendChild(tableData); 

                    //
                    tableData = document.createElement("td");

                    tableData.innerHTML = izracun_prodajni;

                    tableRowDOM.appendChild(tableData); 
                }

            };
    };

    buttonDOM.addEventListener('click', (event)=>{
        
        removeTablica();

        calculate();

    });

}

Convert();

