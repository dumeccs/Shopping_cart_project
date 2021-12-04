const cartDOM = document.querySelector(".cart")
let cart=[];

const addToCartButtonsDOM = document.querySelectorAll('[data-action ="ADD_TO_CART"]');
addToCartButtonsDOM.forEach((addToCartButtonDOM)=>{
    const productDOM = addToCartButtonDOM.parentNode
    addToCartButtonDOM.addEventListener('click', ()=>{

        const product ={
            image:productDOM.querySelector('.product__image').getAttribute('src'),
            name:productDOM.querySelector('.product__name').innerText,
            price:productDOM.querySelector('.product__price').innerText,
            quantity:1
        };
       const isInCart=cart.filter((cartItem)=>
           cartItem.name === product.name
       ).length > 0;
       if(!isInCart){

           cartDOM.insertAdjacentHTML("beforeend",`<div class="cart__item">
           <img class="cart__item__image" src="${product.image} alt="${product.name}"/>
           <h3 class="cart__item__name">${product.name}</h3>
           <h3 class="cart__item__price">${product.price}</h3>

           
           <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
           <h3 class="cart__item__quantity">${product.quantity}</h3>
           <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
           <button class="btn btn--danger btn--small " data-action="REMOVE_ITEM">&times;</button>
           </div>`);
           // we want to ensure that the a certain cart is not added more than once
           cart.push(product)
           addToCartButtonDOM.innerText = "In cart"
           

           const cartItemsDOM =cartDOM.querySelectorAll(".cart__item");
           cartItemsDOM.forEach((cartItemDOM)=>{
               if(cartItemDOM.querySelector('.cart__item__name').innerText === product.name){
                   
                   cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click',()=>{
                        cart.forEach((cartItem)=>{
                            if(cartItem.name === product.name){
                               
                                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity
                            }
                        })
                   })
                   cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click',()=>{
                    cart.forEach((cartItem)=>{
                        if(cartItem.name === product.name){
                           if(cartItem.quantity>1){

                             cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity
                           }
                           else{
                               cartItemDOM.remove();
                               cart = cart.filter((cartItem)=>cartItem.name !==product.name)
                               addToCartButtonDOM.innerText ="Add to cart"
                           }
                        }
                    })
               })
               cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click',()=>{
                cart.forEach((cartItem)=>{
                    if(cartItem.name === product.name){ 
                       if(cartItem.quantity>1){

                         cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity
                       }
                       else{
                           cartItemDOM.remove();
                           cart = cart.filter((cartItem)=>cartItem.name !==product.name)
                           addToCartButtonDOM.innerText ="Add to cart"
                       }
                    }
                })
           })
                   
                   
               }

           });

       }
        
    })


});
//got the DOM, attached, variable of object to each product feature,added a click event, looped