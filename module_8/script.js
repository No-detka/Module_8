

const loadBtn = document.querySelector(".header__btn-load"); //кнопка Загрузить картинки
const clearBtn = document.querySelector(".header__btn-clear"); //кнопка Удалить картинки
const postsContainer = document.querySelector(".main__posts-container"); //див, в который будем загружать все картинки


const fetchData = () => {
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => response.json()) 

   
    .then((data) => {
      
      data.forEach((post) => {
       
        const postElement = document.createElement("div");
        
        postElement.classList.add("main__posts-container-img");

       
        postElement.innerHTML = `
<a href="${post.url}" target="_blank"><img src="${post.url}" alt="Картинка с котом ${post.id}" style="display:none;" /></a>
<div class="main__posts-container-loader"></div>
`;
        
        postsContainer.appendChild(postElement);
      });

      
      const listImg = document.querySelectorAll(".main__posts-container-img");
      
      listImg.forEach((img) => {
        const imgItem = img.querySelector("img"); 
        const imgLoader = img.querySelector(".main__posts-container-loader"); 
        
        imgItem.addEventListener("load", function () {
          imgLoader.style.display = "none";
          imgItem.style.display = "block";
        });

        img.addEventListener("error", () => {
          imgLoader.style.display = "none";
          imgItem.style.display = "none";
          console.error("Ошибка загрузки");
        });
      });
    })

    .catch((error) => {
      console.error("Error: ", error);
    });
};


const cleanData = () => {
  postsContainer.innerHTML = "";
};


loadBtn.addEventListener("click", fetchData);
clearBtn.addEventListener("click", cleanData);