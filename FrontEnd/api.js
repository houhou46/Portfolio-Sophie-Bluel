import { getCategories, showGallery, getProjects } from './functions.js'
// sélectionne un élément HTML avec la classe 'gallery' et on le stocke dans la variable gallery
const btnprojet = document.querySelector('.btnprojet')
const projects = await getProjects();
const categories = await getCategories()

showGallery(projects)

categories.forEach(category => {
    let button = document.createElement('button');
    button.textContent = category.name;
    button.id = category.id;
    button.classList.add('filter')
    btnprojet.appendChild(button);
})

const buttons = document.querySelectorAll('.filter')

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        let id = event.target.id;
        if (id != 'btnAll') {
            showGallery(projects.filter(image => image.categoryId == id));
        } else {
            showGallery(projects)
        }
    });
})