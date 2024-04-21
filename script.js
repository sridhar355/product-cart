let products = [ { id: 1, name: 'Product-1', price: 100, units: 0},
    { id: 2, name: 'Product-2', price: 200, units: 0},
    { id: 3, name: 'Product-3', price: 300, units: 0},];
let productsElement = document.getElementById('products');
let cartElement = document.getElementById('cart-items');
let toatlPriceElement = document.getElementById('price');

let cart = [];
function getProduct(){
    productsElement.innerHTML = '';
    products.forEach((product) => {
        let listItem = document.createElement('div');
        listItem.innerHTML = `<p>${product.name}</p> <p>${product.price}</p>
            <div class="btn"><span onclick="removeProducts(${product.id})" class="decre"> - </span><span>${product.units}</span><span onclick="addProducts(${product.id})" class="decre"> + </span></div>`;
            listItem.style.display = "flex";
            listItem.style.width="20rem";
            listItem.style.margin = "8px";
            listItem.style.justifyContent = "space-around";
            listItem.style.alignItems = "center";
        listItem.style.backgroundColor = "rgba(178, 178, 187, 0.9)";
        productsElement.appendChild(listItem);
    });
}
function getItemsInCart(){
    cartElement.innerHTML = '';
    let totalPrice = 0;
    if(cart.length === 0){
        let noProductsAdded = document.createElement('p');
        noProductsAdded.innerText = 'No Product added to the cart';
        cartElement.appendChild(noProductsAdded);
        cartElement.style.color='black';
    }
    else{
        cart.forEach((cartItem) => {
            let listItem = document.createElement('div');
            listItem.innerHTML = `<p>${cartItem.name}</p> <p>${cartItem.units} x ${cartItem.price}</p>`;
            listItem.style.backgroundColor = "rgba(178, 178, 187, 0.9)";
            listItem.style.justifyContent = "space-around";
            listItem.style.alignItems = "center";
            listItem.style.display = "flex";
            listItem.style.width = "17rem";
            listItem.style.margin = "1rem";
            listItem.style.color="white";
            cartElement.appendChild(listItem);
            totalPrice += cartItem.price * cartItem.units;
        });
    }
    toatlPriceElement.innerText = `Total Price: ${totalPrice}`;
}
function addtocart(product){
    let itemInCart = cart.find((item) => item.id === product.id);
    if(itemInCart){
        itemInCart.units++;
    }
    else{
        cart.push({ ...product, units: 1 });
    }
    getProduct();
    getItemsInCart();
}
function addProducts(productId){
    let Product = products.find((p) => p.id === productId);
    if(Product){
        Product.units++;
        addtocart(Product);
    }
}
function removeProducts(productId){
    let Product = products.find((p) => p.id === productId);
    if(Product && Product.units>0){
        Product.units--;
        let itemInCart = cart.find((cartItems) => cartItems.id === productId);
        if(itemInCart){
            itemInCart.units--;
            if(itemInCart.units === 0){
                cart = cart.filter((item) => item.id !== productId);
            }
        }
        getProduct();
        getItemsInCart();
    } 
}

getItemsInCart();
getProduct();