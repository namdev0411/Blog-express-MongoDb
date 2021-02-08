let id;
document.querySelectorAll(".btn-delete").forEach(btn=>{
    btn.addEventListener('click',()=>{
        id = btn.getAttribute('data-id');
        const formDelete = document.querySelector("#modal-btn-delete").parentElement;
        console.log(formDelete);
        formDelete.action=`/post/delete/${id}`;
    })
})