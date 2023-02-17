const personModule = {
  getPersonsFromApi: async ( ) => {
    const personTable = document.querySelector('#personTable');

    //Initialisation du tableau
    personTable.innerHTML = "";

    //On récupère tous les personnes de l'API
    const response = await fetch(`${app.base_url}/persons`);
    const persons = await response.json();

    //On récupère l'élèment HTML select
    const personSelect = document.querySelector('select[name="personId"]');

    // persons.forEach(person => {)}
    for(const person of persons){
        //On créé un person dans le DOM par person 
        personModule.makePersonInDOM(person);
        //On crée une option par person
        const option = document.createElement('option');
        option.value = person.id;
        option.text = `${person.firstname} ${person.lastname}`;
        personSelect.appendChild(option);
    };
  },
    //Fonction de crÃ©ation des persons dans le DOM
    makePersonInDOM: async function(person) {
      const personTable = document.querySelector('#personTable');
      const lineTable = document.createElement('tr');

      //On donne Ã  chaque ligne l'id du person
      lineTable.dataset.personId = person.id;

      const lastnameTd = document.createElement('td');
      lastnameTd.innerText = person.lastname;
      lineTable.appendChild(lastnameTd);

      const firstnameTd = document.createElement('td');
      firstnameTd.innerText = person.firstname;
      lineTable.appendChild(firstnameTd);

      personTable.appendChild(lineTable);

      //On Ã©coute le clic sur la tableau pour sÃ©lectionner une ligne
      personTable.addEventListener('click', personModule.selectpersonInTable);
  },

    //Fonction d'ajout d'un nouveau person
    handleAddPersonForm: async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target.closest('form'));
      console.log(formData.get('lastname'));
      console.log(formData);

     const response =  await fetch(`${app.base_url}/persons`, {
          method: 'POST',
          body: formData
      });

      const person = await response.json()
      console.log(person);
      //on recharge la liste
      personModule.getPersonsFromApi();
  },

  //Fonction de modification de persons
  handleEditPersonForm: async function(event) {
      event.preventDefault();
      const form = event.target.closest('form');

      const selectedPersonId = document.querySelector('#selectedPersonId').value;

      if(!selectedPersonId) {
          alert('Veuillez sÃ©lectionner une ligne avant de la modifier.');
      }

      const formData = new FormData(form);

      await fetch(`${app.base_url}/persons/${selectedPersonId}`, {
          method: 'PUT',
          body: formData
      });

      //on recharge la liste
      personModule.getPersonsFromApi();

      //On rÃ©initialise le formulaire
      form.reset();
  },

  //Fonction de suppression de persons
  handleDeletePersonForm: async function(event) {
      event.preventDefault();

      const selectedPersonId = document.querySelector('#selectedPersonId').value;

      if(!selectedPersonId) {
          alert('Veuillez sÃ©lectionner une ligne avant de la supprimer.');
      }

      await fetch(`${app.base_url}/persons/${selectedPersonId}`, {
          method: 'DELETE'
      });

      //on recharge la liste
      personModule.getPersonsFromApi();

      //On rÃ©initialise le formulaire
      const form = event.target.closest('form');
      form.reset();

  },

     //Fonction de sÃ©lection d'un person
     selectpersonInTable: async function(event) {
      //On enlÃ¨ve la classe de sÃ©lection sur toutes les lignes du tableau
      const trs = event.target.closest('tbody').querySelectorAll('tr');
      const selectedPersonId = document.querySelector('#selectedPersonId');
      trs.forEach(tr => {
          tr.classList.remove('is-selected');
          selectedPersonId.value = '';
      });

      //On ajoute la classe de sÃ©lection sur la ligne du tableau sÃ©lectionnÃ©e
      event.target.closest('tr').classList.toggle('is-selected');

      //On stocke l'id de la carte sÃ©lectionnÃ© dans le champ cachÃ© du formulaire
      selectedPersonId.value = event.target.closest('tr').dataset.personId;

      //On remplit le formulaire avec les donnÃ©es de la ligne sÃ©lectionnÃ©e
      const response = await fetch(`${app.base_url}/persons/${event.target.closest('tr').dataset.personId}`);
      const person = await response.json();
      
      const form = document.querySelector('#personForm');
      console.log(form);
      console.log(form.querySelector('input[name="lastname"]'));
      form.querySelector('input[name="lastname"]').value = person.lastname;        
      form.querySelector('input[name="firstname"]').value = person.firstname;     
  }
}
