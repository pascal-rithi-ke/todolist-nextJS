'use client'

import { useState } from "react";

export default function Exo() {

  // Exo 1.1
  let age : number = 25;
  console.log(age);

  let username : string = "Alice";
  console.log(username);

  let isActive : boolean = true;
  console.log(isActive);

  let undefinedValue : undefined;
  console.log(undefinedValue);

  // Exo 1.2
  function greet(name:string){
    return(console.log("Bonjour "+name));
  }
  greet("Lorem")

  // Exo 1.3
  let score = 100;
  console.log(score+"5"); // Score devient un string et le résultat est 1005

  // Exo 2.1
  let id : string | number;
  id = 5;
  console.log(id);
  
  id = "cinq";
  console.log(id);

  // Exo 2.2
  type UserID = string | number;
  let userId: UserID;
  
  userId = 5;
  userId = "ABC123";
  console.log(userId);

  // Exo 2.3
  function printMessage(message?:string){
    if(message !== undefined){
      console.log(message);
    }else{
      console.log("Pas de message");
    }
  }
  printMessage();
  printMessage("Un message")

  // Exo 3.1
  let names : string[] = [];
  names.push("Alice");
  names.push("Bob");
  names.push("Charlie");

  function getNamesStart_A(namesArr: string[]): string[] {
    return namesArr.filter(name => name.startsWith("A"));
  }
  getNamesStart_A(names);

  // Exo 3.2
  let user : {
    id : number,
    name : string,
    isAdmin : boolean
  }
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [statut, setStatut] = useState<string>("user");

  function toggleAdmin() {
    setIsAdmin(prev => !prev);
    setStatut(prev => (prev === "user" ? "admin" : "user"));
  }

  // Exo 4.1
  interface Product {
    id : number;
    name : string;
    price : number;
  }

  const product: Product = {
    id : 1,
    name : "Banana",
    price : 1
  }
  console.log(product);

  // Exo 4.2
  let reduction : number = 20;
  function applyDiscount(product : Product, reduction : number){
    let finalPrice = product.price * (100 - reduction) / 100;
    console.log(`Prix final après réduction : ${finalPrice}`);
    return(finalPrice);
  }
  applyDiscount(product, reduction);

  return (
    <div>
      <p>EXO</p>
      <button onClick={() => toggleAdmin()}>Toggle Admin</button>
      <p>{statut}</p>
    </div>
  )
}