const likeBtn = document.querySelector("#like");
console.log(likeBtn);
likeBtn.addEventListener('click',()=>{
    likeBtn.classList.add('active');
})