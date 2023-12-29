let wrapper = document.querySelector(".total-list");
let wrapperPrice = document.querySelector(".wrapper-in-price");
function firstAddCard() {
  fetch("https://fakestoreapi.com/products?limit=18")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let listItem = document.createElement("li");
        let foto = document.createElement("img");
        let titles = document.createElement("h3");
        let paragraph = document.createElement("p");
        let span = document.createElement("span");
        let wraperSpan = document.createElement("div");
        let addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.textContent = "Add to cart";
        wraperSpan.className = "wrapper-price-container";
        span.textContent = `${item.price}$`;
        paragraph.textContent = item.description;
        titles.textContent = item.title;
        paragraph.className = "paragraph";
        titles.className = "total-title";
        listItem.className = "list-item";
        foto.className = "total-foto";
        foto.src = item.image;
        listItem.append(foto, titles, paragraph, wraperSpan);
        wraperSpan.append(span, addButton);
        wrapper.append(listItem);
      });
    });
}
firstAddCard();
//=================================================================
let myCard = document.querySelector(".my-card");
let blocksItem = document.querySelector(".text");
let totalPrice = document.querySelector(".total-price");
let totalAmout = 0;

function addToCard(e) {
  if (e.target.classList.contains("add-button")) {
    blocksItem.style.display = "flex";
    totalPrice.style.display = "block";
    let listItem = e.target.closest(".list-item");
    let newBox = document.createElement("div");
    newBox.className = "new-box";
    let foto = listItem.querySelector(".total-foto");
    let SearchPrice = listItem.querySelector("span");
    let NewPrise = document.createElement("span");
    let removeButton = document.createElement("button");
    let input = document.createElement("input");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    let containerInput = document.createElement("div");
    minus.textContent = "-";
    plus.textContent = "+";
    plus.className = "plus";
    minus.className = "plus";
    input.className = "inputPrice";
    input.value = 1;
    input.min = 1;
    input.append(plus);
    removeButton.textContent = "REMOVE";
    removeButton.className = "remove-button";
    let newFoto = document.createElement("img");
    newFoto.src = foto.src;
    newFoto.classList.add("total-foto");

    plus.addEventListener("click", () => {
      input.value++;
      addTotalPrice();
    });

    minus.addEventListener("click", () => {
      if (input.value > 1) {
        input.value--;
        takeAwayTotalPrice();
      }
    });

    function takeAwayTotalPrice() {
      let itemPrice = parseFloat(SearchPrice.textContent);
      totalAmout -= itemPrice;
      updateTotalPrice();
    }

    function addTotalPrice() {
      let itemPrice = parseFloat(SearchPrice.textContent);
      totalAmout += itemPrice;
      updateTotalPrice();
    }

    function updateTotalPrice() {
      NewPrise.textContent = `${
        parseFloat(SearchPrice.textContent) * input.value
      }$`;
      totalPrice.textContent = `Total price: ${totalAmout.toFixed(2)}$`;
    }

    containerInput.append(input, plus, minus);
    myCard.append(newBox);
    newBox.prepend(newFoto, NewPrise, containerInput, removeButton);

    newBox.addEventListener("click", (e) => {
      let event = e.target.closest(".remove-button");
      if (event) {
        myCard.removeChild(newBox);
        texContentCard.textContent--;
        takeAwayTotalPrice();
      }
    });

    addTotalPrice();
  }
  let texContentCard = document.querySelector(".card-text-content");
  texContentCard.textContent++;
}
let card = document.querySelector(".card");
let cardWrapper = document.querySelector(".card-wrapper");
let closest = document.querySelector(".closest");
closest.addEventListener("click", () => {
  cardWrapper.style.display = "none";
});
card.addEventListener("click", () => {
  cardWrapper.style.display = "block";
});

wrapper.addEventListener("click", addToCard);
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
