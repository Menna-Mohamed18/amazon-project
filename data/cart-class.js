class Cart{
  cartItmes=undefined;  //adding a property to a class
  localStorageKey=undefined;
  constructor(localStorageKey){
    this.localStorageKey=localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage(){
    this.cartItmes=JSON.parse(localStorage.getItem(this.localStorageKey));

    if(!this.cartItmes){
      this.cartItmes=[{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliverOptionId:'1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliverOptionId:'2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItmes));
  }  

  addToCart(productId){
    let matchingItem;
    this.cartItmes.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    })
    // const quantityElement=document.querySelector(`.js-quantity-selector-${productId}`);
    // const quantity=Number(quantityElement.value);
    if(matchingItem){
      matchingItem.quantity+=1;
    }
    else{
      this.cartItmes.push({
        productId:productId,
        quantity:1,
        deliverOptionId:'1'
      })
    }
    this.saveToStorage();
  }

  removeFromCart(productId){
    const newCart=[];

    this.cartItmes.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    this.cartItmes=newCart;

    this.saveToStorage();
  }

  updateDeliveryOption(productId,deliverOptionId){
    let matchingItem;

    this.cartItmes.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem=cartItem;
      }
    });

    matchingItem.deliverOptionId=deliverOptionId;
    this.saveToStorage();
  }
}

//giving the class some properties and methods

const cart=new Cart('cart-opp');
const businessCart=new Cart('cart-business');


console.log(cart);
console.log(businessCart);