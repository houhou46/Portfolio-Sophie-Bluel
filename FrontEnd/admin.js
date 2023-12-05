import { getProjects, deleteWork } from './functions.js'

const modaleContent = document.querySelector('.modale-content')
const imageContainer = document.querySelector('.images-container')
const gallery = document.querySelector('.gallery')

async function showProjects() {
  const data = await getProjects()

  gallery.innerHTML = ''
  imageContainer.innerHTML = ''

  data.forEach((projet) => {

    const figure = `
      <figure>
          <img src="${projet.imageUrl}" alt="${projet.title}">
          <figcaption>${projet.title}</figcaption>    
      </figure>
  `
    gallery.innerHTML += figure



    const div = `
            <div>
                <img src="${projet.imageUrl}" alt="${projet.title}">
                <i class="fa-solid fa-trash-can trash" data-id="${projet.id}"></i>    
            </div>
        `

    imageContainer.innerHTML += div
    // Recuperer la modal ou on met les projets
    // Créer comme pour figure la structure
    /**
     * <div>
          <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
          <i class="fa-solid fa-trash-can trash"></i>
        </div>
     */
    // A chaque fois, rajouter dans le innerHTML de ta modal la div que tu viens de créer
  });
}

showProjects().then(() => {
  const trashs = document.querySelectorAll('.trash');

  trashs.forEach((trash) => {
    trash.addEventListener('click', async (e) => {
      console.log(e.target.getAttribute('data-id'))
      const idToDelete = e.target.getAttribute('data-id');
      deleteWork(idToDelete)
      showProjects()
    })
  })
})

const imageModalLink = document.getElementById('images-modal')
const imageModal = document.getElementById('openmodale')

imageModalLink.addEventListener('click', () => {
  imageModal.classList.toggle('hidden')
})

const modale2 = document.querySelector('#modale2') // deuxième modale 
const openModale2 = document.querySelector('#openmodale2') // bouton pour ouvrir la deuxième modale
const closeModale2 = document.querySelector('#closemodale2') // pour fermer la deuxième modale 

openModale2.addEventListener('click', toggleSecondModal)
closeModale2.addEventListener('click', toggleSecondModal)

function toggleSecondModal() {
  modale2.classList.toggle('hidden')
}