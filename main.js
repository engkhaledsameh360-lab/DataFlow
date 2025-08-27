// Definitions
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let service = document.getElementById('service');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let x;

// Calculate the total price
function getTotal ()
{
if(price.value != '') {
let result = (+price.value + +taxes.value + +service.value)
- +discount.value;
total.innerHTML = result;
total.style.background= '#040';
} else {
    total.innerHTML='';
    total.style.background='#530879'
}
}

// Create a product
let data;
if(localStorage.product != null) {
    data = JSON.parse(localStorage.product)
} else

 {
    data = [];
}
submit.onclick = function() {
    let datapro = { 
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        service : service.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
if(title.value != '' && price.value !=''
 && category.value!='' && datapro.count < 101
  )
  {
    if ( mood === 'create' ) {
    if (datapro.count > 1) {
    for (let i = 0; i < datapro.count; i++) {
        data.push(datapro);
    }
} else {
    data.push(datapro);
}
} else {
    data [ x ] =  datapro;
    mood = 'create'
    submit.innerHTML = 'Create';
    count.style.display = 'block';
}
   clearData();
}

   localStorage.setItem('product',JSON.stringify(data));

   ReadData();
}

// Clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    service.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value= '';
    category.value = '';
}

// ReadData
function ReadData() { 
    getTotal ()
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += ` <tr>
                        <td>2300${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].service}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button button onclick = " updateData ( ${i} )" id="update">Update</button></td>
                        <td><button onclick = " deleteData ( ${i} )" id="delete">Delete</button></td>   
                         </tr> `
    }
    document.getElementById('tbody').innerHTML = table;
    let DeleteAll = document.getElementById('deleteAll');
    if (data.length > 0){
     DeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All ( ${ data.length } )</button>`;   
    } else{
        DeleteAll.innerHTML = '';
    }
}
ReadData();

// Delete the product
function deleteData (i) {
data.splice(i,1);
localStorage.product = JSON.stringify (data);
ReadData();
}

// Delete all products
function deleteAll() {
 localStorage.clear();
 data.splice(0);
 ReadData();
}
 
// Update the product
function updateData (i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    service.value = data[i].service;
    discount.value = data[i].discount;
    getTotal();
    count.style.display = 'none'
    category.value = data[i].category;
    submit.innerHTML = ' Update'
    mood = 'update'
    x = i;
    scroll({
        top : 0,
        behavior : 'smooth',
    })
}

// search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if (id === 'searchtitle'){
        searchMood = 'title';
        search.placeholder ='Search By Title';
    } else { 
        searchMood = 'category';
        search.placeholder ='Search By Category';
    }
    search.focus();
    search.value ='';
    ReadData()
}

function searchdata(value) {
    let table = '';
    if (searchMood === 'title') {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>2300${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].service}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>   
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>2300${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].service}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].count}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>   
                </tr>`;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}