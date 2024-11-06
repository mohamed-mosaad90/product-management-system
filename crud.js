//hold elements

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let search = document.getElementById('search');
let body = document.getElementById('body');
let mood = 'create';
let flex;
function getTotal() {
    if (price.value != '') {
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.background = '#008000';
    } else {
        total.innerHTML = ' ';
        total.style.background = '#ff0000';

    }
}


let dataProduct;
if (localStorage.product != null) {
    //
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}
//Empty inputs
function emptyInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != "" && price.value != "" && count.value < 100) {


        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[flex] = newProduct;
            count.style.display = "block"
            submit.innerHTML = "Create"
            mood = create;

        }
        emptyInputs();
    }

    console.log("obj:", newProduct);
    console.log("arr:", dataProduct);
    localStorage.setItem('product', JSON.stringify(dataProduct))
    readProduct();

}
function readProduct() {
    let table = '';
    getTotal()
    for (let i = 0; i < dataProduct.length; i++) {
        table +=
            `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>
`

    }
    body.innerHTML = table;

    let delateAll = document.getElementById('delateAll');
    if (localStorage.product != null) {
        delateAll.innerHTML = `<button onclick="delateAll()">Delete All (${dataProduct.length})</button>`
    } else {
        delateAll.innerHTML = '';
    }
}
readProduct()
//delete
function deleteProduct(index) {
    dataProduct.splice(index, 1);
    localStorage.product = JSON.stringify(dataProduct)
    readProduct();
}
//delete all
function delateAll() {
    dataProduct.splice(0);
    localStorage.product = JSON.stringify(dataProduct)
    readProduct();
}
//Update
function updateProduct(index) {
    title.value = dataProduct[index].title;
    price.value = dataProduct[index].price;
    taxes.value = dataProduct[index].taxes;
    ads.value = dataProduct[index].ads;
    discount.value = dataProduct[index].discount;
    count.style.display = 'none';
    category.value = dataProduct[index].category;
    submit.innerHTML = "update";
    mood = "update";
    flex = index;
    getTotal();
    scroll({
        top: 0, behavior: "smooth"
    })
}

//search
let searchMood = 'searchTitle';
function getSearchMood(id) {
    if (id === "searchTitle") {
        searchMood = "searchTitle";
        search.placeholder = "Title"
        search.value = "";
        readProduct();
    }
    else {
        searchMood = "searchCategory"
        search.placeholder = "Category"
        search.value = "";
        readProduct();
    }
    search.focus()
    console.log(searchMood);

}
function searchData(value) {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood == "searchTitle") {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table +=
                    `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`
            }







        } else {
            console.log("okkkkkkkkkkk");

            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table +=
                    `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
            </tr>`
            }

        }
    }
    body.innerHTML = table;

}
