
//----------------------
async function loadProjects() {
    try {
        const response = await fetch('datas/datas.json');
        const projects = await response.json();

        const container = document.querySelector('.container');

        projects.forEach((project) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img class="pic" src="${project.image}" alt="logo ${project.title}">
                <div class="cardContainer">
                    <h3>${project.title}</h3>
                    <p class="Pcard">${project.description}</p>
                </div>
                <div class="cardFooter">
                    <i data-id="${project.id}" aria-hidden="false" aria-label="Afficher les informations complémentaires" class="fa-solid fa-plus infos"></i>
                    <a class="project" title="Voir le projet ${project.title}" href="${project.link}" target="_blank">Voir le projet</a>
                </div>
            `;
            container.appendChild(card);

            
            const infoLink = card.querySelector('.infos');
            infoLink.addEventListener('click', (e) => {
                e.preventDefault();  
                const projectId = parseInt(infoLink.getAttribute('data-id'));
                const projectData = projects.find(p => p.id === projectId);
                builModal(projectData); 
            });
        });
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
    }
}

loadProjects();
//----------------------

window.addEventListener("scroll",function(){
    if(window.matchMedia("(max-width: 810px)").matches){
        if(window.scrollY>=1200){
            document.querySelector('.arrTop').style.visibility='visible';
        }else{
            document.querySelector('.arrTop').style.visibility='hidden'
        }
    }else{
            document.querySelector('.arrTop').style.visibility='hidden'
    }
});

window.addEventListener("scroll",function(){
    if(window.matchMedia("(max-width: 810px)").matches){
        if(document.documentElement.scrollTop<=10){
            document.querySelector("header").style.boxShadow='none'
        }else{
            document.querySelector("header").style.boxShadow='0 1px 8px rgba(0, 0, 0, 0.3)'
        }
    }else{
        document.querySelector("header").style.boxShadow='none'
    }
});

if(window.matchMedia("(max-width: 810px)").matches){
    let prevScrollpos=document.documentElement.scrollTop;
    window.addEventListener("scroll",function(){
        let currentScrollPos=document.documentElement.scrollTop;
        if(prevScrollpos>currentScrollPos){
            document.querySelector('header').style.top="0"
        }else{
            document.querySelector('header').style.top="-110px";
            document.querySelector("header").style.boxShadow='none'
        }
        prevScrollpos=currentScrollPos
    }
)};

window.addEventListener("scroll",function(exp){
    exp=document.querySelectorAll(".expo");
    const{scrollTop,clientHeight}=document.documentElement;
    for(let i=0;i<exp.length;i++){
        const topElementToTopWindow=exp[i].getBoundingClientRect().top;
        if(scrollTop>(scrollTop+topElementToTopWindow)-clientHeight*0.60){
            exp[i].classList.add("active")
        }
    }
});

let trigg=document.getElementById('burger');

trigg.addEventListener("click",function(){
    if(trigg.getAttribute('src')=="Images/burger1.webp"){
        trigg.setAttribute("src","Images/burger2.webp")
    }else if(trigg.getAttribute('src')=="Images/burger2.webp"){
        trigg.setAttribute("src","Images/burger1.webp")
    }else{
        trigg.setAttribute("src","Images/burger1.webp")
    }
    ul=document.querySelector('.cache');
    ul.classList.toggle('show');
    document.querySelector(".colorOn").classList.toggle('colorOff')
});

let links=document.querySelectorAll('nav ul li a');

for(let i of links){
    i.addEventListener('click',function(){
        trigg.setAttribute("src","Images/burger1.webp");
        document.querySelector('header').classList.remove('colorOff');
        document.querySelector('nav ul').classList.remove('show')
    })
}
let date=new Date().getFullYear();
let insert=document.createTextNode(' '+date);
let footer=document.querySelector('footer p');
footer.appendChild(insert);


//----------------------Modal

function builModal(data){

    const modal = document.getElementById("modal");
    modal.innerHTML = "";

    const modalWrapper = document.createElement("div");
    modalWrapper.setAttribute("class", "modalWrapper");

    const close = document.createElement("div");
    close.setAttribute("class", "close");

    const iconClose = document.createElement("i");
    iconClose.setAttribute("class","fa-solid fa-xmark");
    close.appendChild(iconClose);

    const title = document.createElement("h2");
    title.setAttribute("class","modalTitle");
    title.innerText = data.title;

    const divDetails = document.createElement("div");
    divDetails.setAttribute("class", "divDetails");

    const pic = document.createElement("img");
    pic.setAttribute("src", data.image);

    const titleDetails = document.createElement("h3");
    titleDetails.innerHTML = `${data.details.titleDetails}`

    const content = document.createElement("p");
    content.setAttribute("class", "details");
    content.innerHTML = `${data.details.contentDetails}`;

    const titleValid = document.createElement("h3");
    titleValid.innerHTML = `${data.details.titleValid}`

    const contentValid = document.createElement("p");
    contentValid.setAttribute("class", "details");
    contentValid.innerHTML = `${data.details.contentValid}`;

    const titleComp = document.createElement("h3");
    titleComp.innerHTML = `${data.details.titleComp}`

    const contentComp = document.createElement("p");
    contentComp.setAttribute("class", "details");
    contentComp.innerHTML = `${data.details.contentComp}`;

    const encounteredTitle = document.createElement("h3");
    encounteredTitle.innerHTML = `${data.details.encounteredTitle}`

    const encounteredContent = document.createElement("p");
    encounteredContent.setAttribute("class", "details");
    encounteredContent.innerHTML = `${data.details.encounteredContent}`;

    const linkSource = document.createElement("a");
    linkSource.href = data.details.linkSource; 
    linkSource.target = "_blank"; 
    linkSource.textContent = data.details.linkText; 

    divDetails.appendChild(pic);
    divDetails.appendChild(titleDetails);
    divDetails.appendChild(content);
    divDetails.appendChild(titleValid);
    divDetails.appendChild(contentValid)
    divDetails.appendChild(titleComp);
    divDetails.appendChild(contentComp);
    divDetails.appendChild(encounteredTitle);
    divDetails.appendChild(encounteredContent);
    divDetails.appendChild(linkSource);

    modal.appendChild(modalWrapper);
    modalWrapper.appendChild(close);
    modalWrapper.appendChild(title);
    modalWrapper.appendChild(divDetails);
    
    
    modal.style.display = null;

    close.addEventListener("click", ()=>{
        modal.innerHTML="";
        modal.style.display = "none";
    })
}