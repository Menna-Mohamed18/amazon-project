export const cart=[];
export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
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
    cart.push({
      productId:productId,
      quantity:1
    })
  }
}
