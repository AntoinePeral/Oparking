const carModule = {
  getCarsFromApi: async ( ) => {
    const carTable = document.querySelector('#carTable');

    //Initialisation du tableau
    carTable.innerHTML = "";

    //On récupère tous les personnes de l'API
    const response = await fetch(`${app.base_url}/cars`);
    const cars = await response.json();


    // cars.forEach(person => {)}
    for(const car of cars){
        //On créé une voiture dans le DOM par voiture 
        carModule.makeCarInDOM(car);
    };
  },
    //Fonction de crÃ©ation des clients dans le DOM
    makeCarInDOM: async function(car) {
      const carTable = document.querySelector('#carTable');
      const lineTable = document.createElement('tr');

      //On donne à chaque ligne l'id de la voiture
      lineTable.dataset.carId = car.id;

      const modelTd = document.createElement('td');
      modelTd.innerText = car.model;
      lineTable.appendChild(modelTd);

      const immatriculationTd = document.createElement('td');
      immatriculationTd.innerText = car.immatriculation;
      lineTable.appendChild(immatriculationTd);

      const personTd = document.createElement('td');
      if (!car.Person) {
        personTd.innerText = '';
      }else {  
        personTd.innerText = `${car.Person.firstname} ${car.Person.lastname}`;
      }
      lineTable.appendChild(personTd);

      carTable.appendChild(lineTable);

      //On Ã©coute le clic sur la tableau pour sÃ©lectionner une ligne
      carTable.addEventListener('click', carModule.selectCarInTable);
  },
  handleAddCar: async (event) => {
    event.preventDefault();
    console.log(event.target.closest('form'));

    const formData = new FormData (event.target.closest('form'));
    console.log(formData.get('model'));
    console.log(formData.get('immatriculation'));
    console.log(formData.get('personId'));
    if(!formData.get('personId')){
      await fetch(`${app.base_url}/cars`, {
          method: 'POST',
          body:  {model: formData.get('model')}
      })
    }
 

    carModule.getCarsFromApi()

  },
   //Fonction de modification de voitures
   handleEditCarForm: async function(event) {
    event.preventDefault();
    const form = event.target.closest('form');

    const selectedCarId = document.querySelector('#selectedCarId').value;

    if(!selectedCarId) {
        alert('Veuillez sÃ©lectionner une ligne avant de la modifier.');
    }

    const formData = new FormData(form);

    await fetch(`${app.base_url}/cars/${selectedCarId}`, {
        method: 'PUT',
        body: formData
    });

    //on recharge la liste
    carModule.getCarsFromApi();

    //On rÃ©initialise le formulaire
    form.reset();
},

  //Fonction de suppression de voitures
  handleDeleteCarForm: async function(event) {
    event.preventDefault();

    const selectedCarId = document.querySelector('#selectedCarId').value;

    if(!selectedCarId) {
        alert('Veuillez sÃ©lectionner une ligne avant de la supprimer.');
    }

    await fetch(`${app.base_url}/cars/${selectedCarId}`, {
        method: 'DELETE'
    });

    //on recharge la liste
    carModule.getCarsFromApi();

    //On rÃ©initialise le formulaire
    const form = event.target.closest('form');
    form.reset();
},
  selectCarInTable: async (event) =>{
    //On enlÃ¨ve la classe de sÃ©lection sur toutes les lignes du tableau
    const trs = event.target.closest('tbody').querySelectorAll('tr');
    const selectedCardId = document.querySelector('#selectedCarId');
    trs.forEach(tr => {
        tr.classList.remove('is-selected');
        selectedCardId.value = '';
    });

    //On ajoute la classe de sÃ©lection sur la ligne du tableau sÃ©lectionnÃ©e
    event.target.closest('tr').classList.toggle('is-selected');

    //On stocke l'id de la carte sÃ©lectionnÃ© dans le champ cachÃ© du formulaire
    selectedCardId.value = event.target.closest('tr').dataset.carId;

    //On remplit le formulaire avec les donnÃ©es de la ligne sÃ©lectionnÃ©e
    const response = await fetch(`${app.base_url}/cars/${event.target.closest('tr').dataset.carId}`);
    const car = await response.json();

    const form = document.querySelector('#carForm');
    form.querySelector('input[name="model"]').value = car.model;        
    form.querySelector('input[name="immatriculation"]').value = car.immatriculation;        
    form.querySelector('select[name="personId"]').value = car.personId;        
  }
}


