const body = $("body");


async function fetchAPI() {
  fetch("https://www.breakingbadapi.com/api/characters", {})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      character = data;
      createCharacter(character);
      console.log(character);
    })
    .catch((error) => console.log("ERROR"));
}

const createCharacter = (character) => {







  
  const cardsContainer = $(".carousel__container");
  for (x = 0; x < character.length; x++) {
    var createCard = document.createElement("div");
    createCard.setAttribute("class", "card");
    createCard.setAttribute("id", "card" + x);
    createCard.innerHTML =
      '<img src="' +
      character[x].img +
      '" class="imgCharacter" >' +
      "</img>" +
      "<hr>" +
      '<div class ="characterinfos">' +
      '<h1 class="characterName">' +
      "Name : " +
      character[x].name +
      "</h1>" +
      "<hr>" +
      '<h2 classe="characterNickname">' +
      '<svg class ="nicknameLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M437.2 403.5L319.1 215L319.1 64h7.1c13.25 0 23.1-10.75 23.1-24l-.0002-16c0-13.25-10.75-24-23.1-24H120C106.8 0 96.01 10.75 96.01 24l-.0002 16c0 13.25 10.75 24 23.1 24h7.1L128 215l-117.2 188.5C-18.48 450.6 15.27 512 70.89 512h306.2C432.7 512 466.5 450.5 437.2 403.5zM137.1 320l48.15-77.63C189.8 237.3 191.9 230.8 191.9 224l.0651-160h63.99l-.06 160c0 6.875 2.25 13.25 5.875 18.38L309.9 320H137.1z"/></svg>' +
      character[x].nickname +
      "</h2>" +
      "<hr>" +
      '<h3 classe="characterBirthday">' +
      character[x].birthday +
      "</h3>" +
      "<hr>" +
      '<h3 classe="characterOcuppation">' +
      character[x].occupation +
      "</h3>" +
      "<hr>" +
      '<h3 classe="characterStatus">' +
      character[x].status +
      "</h3>" +
      "</div>";

    cardsContainer.append(createCard);
  }
};


class Carousel {
  
    /**
     * @param element (elementHTML)
     * @param options (Object) nombre d'élément a faire défilé
     * @param options (Object) nombre d'élement contenu dans un slide
     */
     constructor (element, options = {}){
       this.element = element
       this.options = Object.assign({},{
         slidesToScroll:1,
         slidesVisible:1,
       },options)
       let children = [].slice.call(element.children)
       this.currentItem = 0

       this.root = this.createDivWithClass("carousel");
       this.container = this.createDivWithClass("carousel__container");
       this.container.style.width = 688 + "%"
       this.root.appendChild(this.container);
       this.element.appendChild(this.root);
       this.item = children.map((child)=>{
         let item = $("#card");
         item.appendChild(child);
         this.container.appendChild(item);
         return item;
         
       })
       this.createNavigation()
       
  }


    createNavigation (){
        let nextButton = this.createDivWithClass("carousel__next")
        let prevButton = this.createDivWithClass("carousel__prev")
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener("click", this.next.bind(this))
        prevButton.addEventListener("click", this.prev.bind(this))

    }

    next(){
      this.container.style.transform = 'translate3d(' + -15 +  '% , 0,0)'
      
    }

    prev(){
      this.container.style.transform = 'translate3d(' + 0 +  '% , 0,0)'
    }

/**
 * deplace le crousel vers l'élement cibler
 * @param {number} index 
 */
    
    goToItem (index){
      
      this.container.style.transform = 'translate3d(' + -20 +  '% , 0,0)'
      this.currentItem = index
    }

    /**
     * 
     * @param {string} className 
     * @return (HTMLElement)
     */

  createDivWithClass (className){
    let div = document.createElement("div")
    div.setAttribute("class", className)
    return div
  }
}

document.addEventListener("DOMContentLoaded", function (){

new Carousel (document.querySelector("#carousel1"),{
slidesToScroll : 62,
slidesVisible : 9
})

})