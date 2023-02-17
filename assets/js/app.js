const app = {
  base_url: 'http://localhost:3000',

  init: function(){
    console.log('app.init!')
    personModule.getPersonsFromApi();
    carModule.getCarsFromApi();
    app.addEventListenerToActions();

  
  },
  addEventListenerToActions :function(){

    // Add car Action
    const addCarBtn = document.querySelector('#addCarButton');
    addCarBtn.addEventListener('click', carModule.handleAddCar);

    //Bouton modifier une voiture
    const editCarButton = document.querySelector('#editCarButton');
    editCarButton.addEventListener('click', carModule.handleEditCarForm);

    //Bouton supprimer une voiture
    const deleteCarButton = document.querySelector('#deleteCarButton');
    deleteCarButton.addEventListener('click', carModule.handleDeleteCarForm);

    //Bouton ajouter un Person
    const addPersonButton = document.querySelector('#addPersonButton');
    addPersonButton.addEventListener('click', personModule.handleAddPersonForm);

    //Bouton modifier un Person
    const editPersonButton = document.querySelector('#editPersonButton');
    editPersonButton.addEventListener('click', personModule.handleEditPersonForm);

    //Bouton supprimer un Person
    const deletePersonButton = document.querySelector('#deletePersonButton');
    deletePersonButton.addEventListener('click', personModule.handleDeletePersonForm);
  },
  

}

document.addEventListener('DOMContentLoaded', app.init );


// getFirstListFromApi : async function() {
//   // Premier tableau
//   const modelContainer =document.querySelector('.model')
//   Sortable.create(modelContainer);

//   modelContainer.innerHTML="";

//   const selectCars = document.querySelector('[name=car]');

//   const response = await fetch(app.base_url + '/cars');
//   const responseListCars = await response.json();

//   for(const car of responseListCars){
//     const container = document.createElement('div');
//     container.classList.add('columns')
//     container.classList.add('is-narrow')
//     modelContainer.append(container)

//     const modelsContainer = document.createElement('div');
//     modelsContainer.innerText = car.model
//     modelsContainer.classList.add('column')
//     modelsContainer.classList.add('is-narrow')
//     container.append(modelsContainer)

//     const immatContainer = document.createElement('div');
//     immatContainer.innerText= car.immatriculation
//     immatContainer.classList.add('column')
//     immatContainer.classList.add('is-narrow')
//     container.append(immatContainer)

//     if (car.Person !== null) {
//       const fullNameContainer = document.createElement('div');
//       fullNameContainer.innerText= `${car.Person.firstname} ${car.Person.lastname}`
//       fullNameContainer.classList.add('column')
//       fullNameContainer.classList.add('is-narrow')
//       container.append(fullNameContainer)
      
//     }
//     const carsOption = document.createElement('option');
//     carsOption.innerText = `${car.model} ${car.immatriculation}`
//     carsOption.value = car.id;
//     selectCars.append(carsOption)
//   }
  
//   // Second table   
//   const containerDiv =document.querySelector('.person-name')
//   containerDiv.innerHTML = "";
  
//   Sortable.create(containerDiv);

//   const responsePerson = await fetch(app.base_url + '/persons');
//   const responseListPerson = await responsePerson.json();

//   const selectPerson = document.querySelector('[name=persons]');

//   for(const person of responseListPerson){
//     const container = document.createElement('div');
//     container.classList.add('columns')
//     container.classList.add('is-narrow')
//     containerDiv.append(container)

//     const nameContainer = document.createElement('div');
//     nameContainer.innerText = person.firstname
//     nameContainer.classList.add('column')
//     nameContainer.classList.add('is-narrow')
//     container.append(nameContainer)

//     const lastnameContainer = document.createElement('div');
//     lastnameContainer.innerText= person.lastname
//     lastnameContainer.classList.add('column')
//     lastnameContainer.classList.add('is-narrow')
//     container.append(lastnameContainer)

//     const personOption = document.createElement('option');
//     personOption.innerText = `${person.firstname} ${person.lastname}`
//     personOption.value = person.id;
//     selectPerson.append(personOption)


//   }


// },
// deletePerson: async function(event) {
//   event.preventDefault()
//   // if(!confirm("Voulez vous supprimer ?")) 
//   // return

//   const personId = event.target.closest('form').querySelector('select').value
//   console.log(personId);
//   const model = event.target.closest('form').querySelector('input[name=model]')
//   console.log(model);
//   const immat = event.target.closest('form').querySelector('input[name=immatriculation]')
//   console.log(immat);

//   await fetch(app.base_url + "/persons/" + personId, 
//   {
//       method:"DELETE"
//   });

//   //Reconstruction de l'IHM
//   app.getFirstListFromApi()

// },
// deleteCars: async function(event) {
//   event.preventDefault()
//   // if(!confirm("Voulez vous supprimer ?")) 
//   // return

//   const carId = event.target.closest('form').querySelector('select').value
//   console.log(carId);
//   const model = event.target.closest('form').querySelector('input[name=model]')
//   console.log(model);
//   const immat = event.target.closest('form').querySelector('input[name=immatriculation]')
//   console.log(immat);

//   await fetch(app.base_url + "/cars/" + carId, 
//   {
//       method:"DELETE"
//   });

//   // //Reconstruction de l'IHM
//   app.getFirstListFromApi()

// },
// addPerson: async function(event) {
//   event.preventDefault();
//   console.log(event.target.closest('form'));
//   const formData = new FormData(event.target.closest('form'));
//   console.log(formData.get('firstname'));
//   console.log(formData.get('lastname'));
  
  

//   await fetch (app.base_url+ '/persons', {
//     method: 'POST',
//     body: ({firstname: formData.get('firstname'), lastname: formData.get('lastname')})
//   })

//   // app.getFirstListFromApi()
// },
// test: function(event){
//   event.preventDefault()
// }