import { getProjects, deleteWork, getCategories, addWork } from './functions.js'

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

    const trashs = document.querySelectorAll('.trash');

    trashs.forEach((trash) => {
      trash.addEventListener('click', async (e) => {
        console.log(e.target.getAttribute('data-id'))
        const idToDelete = e.target.getAttribute('data-id');
        await deleteWork(idToDelete)
        showProjects()
      })
    })
  });
}

showProjects()

const modale1 = document.getElementById('openmodale')
const openModale1 = document.getElementById('images-modal')
const closeModale1 = document.querySelector('#closemodale1') // pour fermer la première modale

const modale2 = document.querySelector('#modale2') // deuxième modale 
const openModale2 = document.querySelector('#openmodale2') // bouton pour ouvrir la deuxième modale
const closeModale2 = document.querySelector('#closemodale2') // pour fermer la deuxième modale 
const returnGallery = document.getElementById('returnGallery') // pour retourner sur la gallery
openModale1.addEventListener('click', toggleFirstModal)
closeModale1.addEventListener('click', toggleFirstModal)


openModale2.addEventListener('click', () => {
  toggleSecondModal()
  toggleFirstModal()
})
returnGallery.addEventListener('click', () => {
  toggleSecondModal()
  toggleFirstModal()
})

closeModale2.addEventListener('click', toggleSecondModal)


function toggleFirstModal() {
  modale1.classList.toggle('hidden')
}
function toggleSecondModal() {
  modale2.classList.toggle('hidden')
}

const categories = await getCategories()
const select = document.querySelector('#category')
categories.forEach(category => {
  let option = document.createElement('option')
  option.value = category.id
  option.textContent = category.name
  select.appendChild(option)
})

const form = document.querySelector('.form')
const image = document.getElementById('image');
const interieur = document.querySelector('.interieur')
const contenu = document.querySelector('.contenu-photo')
const contenuImg = document.querySelector('.contenu-photo img');

const title = document.getElementById('title');
const category = document.getElementById('category');
const valider = document.getElementById("valider");

image.addEventListener('change', toggleInputFile)

function toggleInputFile(e) {
  // Si une image a été ajouté, cacher le bouton ajouter une image
  contenu.classList.toggle('center')
  contenuImg.classList.toggle('hidden')
  if (contenuImg.getAttribute('src') == '') {
    contenuImg.src = URL.createObjectURL(e.target.files[0])
  } else {
    contenuImg.src = ''
  }
  interieur.classList.toggle('hidden')
}



form.addEventListener('submit', async (e) => {
  e.preventDefault()

  

  console.log(title.value)
  console.log(category.value)
  console.log(image.files[0])

  const data = new FormData()
  data.append('image', image.files[0])
  data.append('title', title.value)
  data.append('category', category.value)

  // Verifier si les champs sont bien remplis avant d'ajouter
  const valeurTitle = title.value
  const valeurCategory = category.value
  if (!image.files[0] || valeurTitle === "" || valeurCategory === "") {
    alert('Veuillez remplir tous les champs')
  } else {
    await addWork(data)
    showProjects()
    image.value = ""
    title.value = ""
    category.value = ""
    toggleInputFile(e)
    // Fermer la modal
    toggleSecondModal()

  }

  // Vider les champs image title et category
 
})

function checkInput () {
  if (image.files[0] && title.value !== "" && category.value !== "") {
   valider.classList.add("green") 
   
  } else {
    valider.classList.remove("green")
   
}
}

image.addEventListener("change", checkInput)
title.addEventListener("input", checkInput)
category.addEventListener("change", checkInput)