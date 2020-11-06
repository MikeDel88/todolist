window.addEventListener('DOMContentLoaded', function () {

    class List {

        // Propriétés
        #nameList = "";
        displayErrorNameList;


        // Constructeur
        constructor(nameList, displayErrorNameList) {

            displayErrorNameList = document.querySelector('#error');
            this.displayErrorNameList = displayErrorNameList;

            this.nameList = nameList;

        }

        //Getters et setters
        get nameList() {
            return this.#nameList;
        }
        set nameList(_nameList) {
            if (this.verif(_nameList)) {
                this.#nameList = _nameList;
                this.displayError("");
                this.displayAddTask();
            } else {
                this.displayError('Erreur sur le nom de la liste');
            }
        }

        // Méthodes
        verif = (name) => {
            if (!isNaN(name) || name == "") {
                return false;
            }
            return true;
        }

        displayError = (msg) => {
            this.displayErrorNameList.innerHTML = msg;
        }

        displayAddTask = () => {

            let div = document.createElement('div');
            div.id = `list_of_${this.nameList}`;
            div.classList.add('w-75', 'm-auto')
            document.body.appendChild(div);
            let displayDiv = document.querySelector(`#list_of_${this.nameList}`);


            let titre = document.createElement('h2');
            titre.classList.add('ml-2', 'border-bottom', 'p-2', 'text-info', 'text-center')
            titre.innerHTML = `Liste à ${this.nameList}`;
            displayDiv.appendChild(titre);


            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('new_task', 'form-control', 'w-50', 'ml-2', 'my-3', 'border-info');
            displayDiv.appendChild(input);

            let buttonAdd = document.createElement('button');
            buttonAdd.classList.add('add_task', 'btn', 'bg-dark', 'text-light', 'mx-2');
            buttonAdd.innerHTML = "Ajouter une tâche";
            buttonAdd.addEventListener('click', () => {
                this.displayTasks();
            })
            displayDiv.appendChild(buttonAdd);

            let listTask = document.createElement('ol');
            listTask.classList.add('my-3', 'border-top', 'border-bottom', 'py-3');
            listTask.style.listStyleType = "none";
            listTask.style.padding = "0";
            displayDiv.appendChild(listTask);

        }

        displayTasks = (item) => {

            // Récupérer la valeur de l'input task
            let infoTask = document.querySelector(`#list_of_${this.nameList} .new_task`).value;

            if (this.verif(infoTask) || item) {

                // Reset des affichages
                this.displayError("");
                let resetValue = document.querySelector(`#list_of_${this.nameList} .new_task`);
                resetValue.value = "";


                // Création dans le DOM
                let listTasks = document.querySelector(`#list_of_${this.nameList} ol`);
                let list = document.createElement('li');
                list.classList.add('my-3', 'd-flex', 'flex-wrap-reverse')
                listTasks.appendChild(list);
                let task = document.querySelector(`#list_of_${this.nameList} li:last-child`);

                let removeTask = document.createElement('button');
                removeTask.classList.add('remove_task', 'mr-2', 'btn', 'bg-danger', 'shadow', 'text-light', 'my-1');
                removeTask.innerHTML = "Supprimer";
                removeTask.addEventListener('click', () => {
                    removeTask.parentNode.remove();
                })
                task.appendChild(removeTask);

                let updateTask = document.createElement('button');
                updateTask.classList.add('update_task', 'mr-2', 'btn', 'bg-warning', 'shadow', 'text-light', 'my-1');
                updateTask.innerHTML = "Modifier";
                updateTask.addEventListener('click', () => {
                    updateTask.nextSibling.innerHTML = prompt(`Modifier la tâche de ${this.nameList}`);
                })
                task.appendChild(updateTask);

                let displayTask = document.createElement('span');
                displayTask.classList.add('display_task', 'border', 'p-2', 'shadow', 'my-1');
                displayTask.innerHTML = (item) ? item : infoTask;
                task.appendChild(displayTask);

                let displayDiv = document.querySelector(`#list_of_${this.nameList}`);
                let displaySave = document.querySelector(`#list_of_${this.nameList} .save_list`);
                if (displaySave == null) {
                    let save = document.createElement('button');
                    save.classList.add('save_list', 'btn', 'm-3', 'bg-info', 'text-light', 'shadow');
                    save.innerHTML = "Sauvegarder";
                    save.addEventListener('click', () => {
                        let tasks = document.querySelectorAll(`#list_of_${this.nameList} .display_task`);
                        let arrayTasks = Array.from(tasks);
                        let arrayJSON = [];
                        arrayTasks.forEach((task) => {
                            arrayJSON.push(task.innerHTML);
                        })
                        localStorage.setItem(`${this.nameList}`, JSON.stringify(arrayJSON));
                    })
                    displayDiv.appendChild(save);
                }

            } else {
                this.displayError(`Erreur sur la tâche de ${this.nameList}`);
            }

        }

        // Local Storage
        displayLocalTask = (items) => {
            items.forEach((item) => {
                this.displayTasks(item);
            })
        }

    }

    // Au chargement du DOM Vérifier s'il existe des données dans le localStorage
    if (localStorage.length != 0) {
        let key;
        let list;
        for (i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i);
            list = new List(nameList = localStorage.key(i));
            let items = JSON.parse(localStorage.getItem(key));
            list.displayLocalTask(items);
        }
    }


    // Evenement sur clique pour créer la liste
    let createList = document.querySelector('#create_list');
    createList.addEventListener('click', () => {

        let nameList = document.querySelector('#name_list').value;

        new List(nameList);

        nameList.value = "";

    })



})
