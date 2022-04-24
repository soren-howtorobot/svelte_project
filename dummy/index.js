"use strict";
window.onload = () => {
  init();
  console.log("Hi mom!");
};

const init = () => {
  prepareForm();
};

const prepareForm = () => {
  const form = document.querySelector("#sampleForm");
  const inputValue = document.getElementById("input");
  form.querySelector("button").addEventListener("click", () => {
    handleClick(1,inputValue.value,document.querySelector('.target'));
  });
  const userForm = document.querySelector("#userForm");
  const username = userForm.querySelector("#userName");
  const password = userForm.querySelector("#userPassword")  ;
  userForm.querySelector('button').addEventListener('click',()=>{
      handleClick(2,{
          username:username.value,
          password:password.value,
      },document.querySelector('.userTarget'))
  })
  const createForm = document.getElementById("createForm");
  createForm.querySelector("button").addEventListener("click", () => {
    
    
     handleClick(
       3,
       {
         cFirst: document.getElementById("cFirst").value,
         cLast: document.getElementById("cLast").value,
         cName: document.getElementById("cName").value,
         cPassword: document.getElementById("cPassword").value,
       },
       document.querySelector(".createtarget")
     ); 
  });
};

const handleClick = async (check,input,node) => {
    switch (check) {
        case 1:
            {
                const x = await askNode(input, "getUser");
                let text = 'WRONG!';
                if (x?.response) {
                  text = 'Bingo!';
                }
                node.textContent = text;
            }
            break;
        case 2:
            {
                const x = await askNode(input, "user");
                console.log(x);
                let text = "You are not in the database..";
                if (x?.response) {
                  text = "You are in the database!";
                  console.log(x.error);
                }
                node.textContent = text;
            }
            break;
        case 3:
          {
            const x = await askNode(input, "user/create");
            console.log(x);
            let text = "You can't be in the database!";
            if (x?.response) {
              text = "Welcome!";
            }
            node.textContent = text;
          }
          break
    }
    
}
const askNode = async (inputData,slug) => {
  const url = `http://127.0.0.1:8080/${slug}`;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: inputData,
    }),
  };
  const response = await fetch(url, config);
  const json = await response.json();
  if (response.ok && json.response) {
    return json;
  } else {
    return false;
  }
};
