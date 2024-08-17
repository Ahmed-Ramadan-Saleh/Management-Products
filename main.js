let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');

let mood ='create';
let tmp;


//get total
function gettotal(){
    if(price.value !=''){
        result =( +price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML = result;
        total.style.background ='#080';
        total.style.color ='#fff';
    }else{
        total.innerHTML ='';
        total.style.background ='#aaa';
    }
}
//create product
//collect data
//object

let num =[];
if( localStorage.array != null){
    num = JSON.parse(localStorage.array);
}else{
    num =[];
}
;

submit.onclick = function(){
    let new_object ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };

    if(title.value !='' && price.value != ''){
        
        if(mood === 'create')
        {
            if(new_object.count > 1)
            {
                for(let i =0; i < new_object.count; i++){
                    num.push(new_object);
                }
            }
            else
            {
                num.push(new_object);
            }

        }
        else
        {
            num[   tmp    ] = new_object;
            mood ='create';
            submit.innerHTML = 'create';
            count.style.display ='block';
        }
        clear_inputs();
    }
    else
    {
        
    }
    
    window.localStorage.setItem('array',JSON.stringify(num));
    
    showdata();
}


//clear inputs
function clear_inputs(){
    title.value = null;
    price.value = null;
    taxes.value = null;
    ads.value = null;
    discount.value = null;
    total.innerHTML = '';
    count.value = null;
    category.value = null;
}

//read
function showdata(){
    gettotal();
    let table ='';
    for(let i = 0 ;i < num.length ;i++ ){
        table += `
        <tr>   
            <td>${i+1}</td>
            <td>${num[i].title}</td>
            <td>${num[i].price}</td>
            <td>${num[i].taxes}</td>
            <td>${num[i].ads}</td>
            <td>${num[i].discount}</td>
            <td>${num[i].total}</td>
            <td>${num[i].category}</td>
            <td><button id="update" onclick="update_data( ${i} )">update</button></td>
            <td><button id="delete" onclick="delete_data( ${i} )">delete</button></td>
        </tr>
        `
    };
    
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = table;
    

    let deleteall =document.getElementById('deleteall');
    if(num.length > 0){
        deleteall.innerHTML = `
        <button id="deleteall" onclick="deleteall()">delete All(${num.length})</button>
        `
    }else{
        deleteall.innerHTML ='';
    }
};

//delete data
function delete_data(i){
    num.splice(i,1);
    localStorage.array = JSON.stringify(num);
    showdata();
}

//delete all
function deleteall(){
    localStorage.clear();
    num.splice(0);
    showdata();
};

//update
function update_data(i){
    title.value = num[i].title;
    price.value = num[i].price;
    taxes.value = num[i].taxes;
    ads.value = num[i].ads;
    discount.value = num[i].discount;
    gettotal();
    count.style.display ='none';
    category.value = num[i].category;
    submit.innerHTML ='update';
    mood ='update';
    tmp = i;
    scroll({top:0,behavior:"smooth"});
    
};

//search
let searchmood ='title';


function getsearchmood(id){
    let search =document.getElementById('search');
    if(id == 'searchtitle'){
        let searchmood ='title';
        search.placeholder = 'search by title';
    }else{
        let searchmood ='category';
        search.placeholder = 'search by categroy';
    }
    
    search.focus();
    search.value = '';
    showdata();
}


//sea
function searchdata(value){
    let table ='';

    if(searchmood == 'title'){
        for(let i = 0;i < num.length ; i++){
            if (num[i].title.includes(value.toLowerCase())){
                
                
                    table += `
                    <tr>   
                        <td>${i}</td>
                        <td>${num[i].title}</td>
                        <td>${num[i].price}</td>
                        <td>${num[i].taxes}</td>
                        <td>${num[i].ads}</td>
                        <td>${num[i].discount}</td>
                        <td>${num[i].total}</td>
                        <td>${num[i].category}</td>
                        <td><button id="update" onclick="update_data( ${i} )">update</button></td>
                        <td><button id="delete" onclick="delete_data( ${i} )">delete</button></td>
                    </tr>
                    `
                
            
            } ;
        }
    }else{
        
        for(let i = 0;i < num.length ; i++){
            if (num[i].category.includes(value.toLowerCase())){
                
                
                    table += `
                    <tr>   
                        <td>${i}</td>
                        <td>${num[i].title}</td>
                        <td>${num[i].price}</td>
                        <td>${num[i].taxes}</td>
                        <td>${num[i].ads}</td>
                        <td>${num[i].discount}</td>
                        <td>${num[i].total}</td>
                        <td>${num[i].category}</td>
                        <td><button id="update" onclick="update_data( ${i} )">update</button></td>
                        <td><button id="delete" onclick="delete_data( ${i} )">delete</button></td>
                    </tr>
                    `
                
            
            } ;
        }
    

    }
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = table;
}

window.onload =function(){
    showdata()
}


// Toggle between light and dark mode
function toggleMode() {
  const body = document.body;
  const currentMode = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
  
  if (currentMode === 'light-mode') {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      document.getElementById('mode-toggle').textContent = '☀️';
  } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      document.getElementById('mode-toggle').textContent = '🌙';
  }
}

//clean data
