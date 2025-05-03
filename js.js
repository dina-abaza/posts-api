 
let posts = [];

async function getPosts() {
    let api = "https://jsonplaceholder.typicode.com/posts";
    try {
        let response = await fetch(api);
        posts = await response.json();
        console.log(posts);
        createPage();
    } catch (error) {
        console.error('خطأ:', error);
    }
}

function createPage() {
    posts.forEach(post => {
        let body = document.body;
        let postElement = document.createElement('div');
        postElement.style.border = '1px solid #ddd';
        postElement.style.padding = '15px';
        postElement.style.marginBottom = '10px';
        let title = document.createElement('h2');
        title.innerText = post.title;
        postElement.appendChild(title);
        title.style.color = 'red';
        let bodyText = document.createElement('p');
        bodyText.innerText = post.body;
        bodyText.style.color = '#666';
        postElement.appendChild(bodyText);
        body.appendChild(postElement);
        let seconddiv=document.createElement('div');
        seconddiv.style.display='flex'
        let btn = document.createElement('button');
        btn.style.padding = '10px , 5px';
        btn.innerHTML = 'Delete';
        btn.setAttribute('data-id', post.id);
        seconddiv.appendChild(btn);
        let seconbtn=document.createElement('button');
        seconbtn.innerHTML='edit';
        seconbtn.style.padding='10px ,5px'
        seconbtn.setAttribute('data-id', post.id);
        seconddiv.appendChild(seconbtn);
        seconbtn.style.marginLeft='20px'
        let btnsave=document.createElement('button');
        btnsave.innerHTML='save';
        btnsave.style.padding='10px ,5px';
        btnsave.style.marginLeft='100px'
        btnsave.setAttribute('data-id', post.id);
        let btncancel=document.createElement('button')
        btncancel.innerHTML='cancel';
        btncancel.style.padding='10px ,5px';
        btncancel.style.marginLeft='20px'
        btncancel.setAttribute('data-id', post.id);
        seconddiv.appendChild(btnsave);
        seconddiv.appendChild(btncancel);
        btncancel.style.display='none';
        btnsave.style.display='none';
        postElement.appendChild(seconddiv);
        let originaltext=post.body;
        


        btn.addEventListener("click", async function deletebtn() {
            try {
                let postId = this.getAttribute('data-id');
                let apidelete = `https://jsonplaceholder.typicode.com/posts/${postId}`;
                let response = await fetch(apidelete, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                postElement.remove();

            } catch (error) {
                console.error('حدث خطأ:', error);
            }
        });

        seconbtn.addEventListener("click", async function editbtn(){
            try{
                let editid=this.getAttribute('data-id');
                let apiedite= `https://jsonplaceholder.typicode.com/posts/${editid}`;
                let response=await fetch(apiedite,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(posts),
                    }
                )
                bodyText.style.border = '2px solid black';
                bodyText.setAttribute('contenteditable', 'true');
                bodyText.setAttribute('spellcheck', 'false');
                bodyText.focus();
                btncancel.style.display='inline-block';
                btnsave.style.display='inline-block';
               
              
        
                
            }
            catch(error){
                console.log('حدث خطأ',error);
            }
        })

        btnsave.addEventListener("click",async function savenewbost(){
            try{
                let saveid=this.getAttribute('data-id');
                let apinewpost= `https://jsonplaceholder.typicode.com/posts/${saveid}`;
                let response=await fetch(apinewpost,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(posts),
                    }
                )
                bodyText.innertext=bodyText.textContent;
                bodyText.style.border='none'
                bodyText.setAttribute('contentEditable','false');
                btnsave.style.display='none';
                btncancel.style.display='none';




            }
           catch(error){
            console.error('حدث خطأ', error);
           }


        })

        btncancel.addEventListener("click", function canceldata(){
            btncancel.style.display='none';
            btnsave.style.display='none';
            bodyText.style.border='none';
            bodyText.setAttribute('contentEditable','false');
            bodyText.innerText= originaltext;

        })



    });
}

getPosts();
