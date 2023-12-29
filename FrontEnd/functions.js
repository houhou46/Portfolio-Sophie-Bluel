async function showGallery(projects) {
    const gallery = document.querySelector('.gallery')

    gallery.innerHTML = ''
    projects.forEach((projet) => {
        const figure = `
            <figure>
                <img src="${projet.imageUrl}" alt="${projet.title}">
                <figcaption>${projet.title}</figcaption>    
            </figure>
        `

        gallery.innerHTML += figure
    });
}

async function getProjects() {
    const request = await fetch('http://localhost:5678/api/works')
    let projects = await request.json()

    return projects;
}

async function getCategories() {
    const request = await fetch('http://localhost:5678/api/categories')
    const data = await request.json()

    return data;
}

async function deleteWork(idToDelete) {
    await fetch(`http://localhost:5678/api/works/${idToDelete}`, {
        method: "DELETE",
        headers: { 'Authorization': 'Bearer: ' + localStorage.getItem('token') }
    })
}

async function addWork(form) {
    await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: { 'Authorization': 'Bearer: ' + localStorage.getItem('token') },
        body: form
    })
}

export {
    getCategories,
    showGallery,
    getProjects,
    deleteWork,
    addWork
}