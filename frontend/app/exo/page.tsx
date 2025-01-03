'use client'

import axios from "axios";
import { useState } from "react";

export default function Exo() {

  // Exo 1.1 Types de base
  const age : number = 25;
  console.log(age);

  const username : string = "Alice";
  console.log(username);

  const isActive : boolean = true;
  console.log(isActive);

  let undefinedValue : undefined;
  console.log(undefinedValue);

  // Exo 1.2 Fonctions typées
  function greet(name:string){
    return(console.log("Bonjour "+name));
  }
  greet("Lorem")

  // Exo 1.3
  const score = 100;
  console.log(score+"5"); // Score devient un string et le résultat est 1005

  // Exo 2.1 Types union
  let id : string | number;
  id = 5;
  console.log(id);
  
  id = "cinq";
  console.log(id);

  // Exo 2.2  Définir des types personnalisés
  type UserID = string | number;
  let userId: UserID;
  
  userId = 5;
  userId = "ABC123";
  console.log(userId);

  // Exo 2.3 Paramètres optionnels
  function printMessage(message?:string){
    if(message !== undefined){
      console.log(message);
    }else{
      console.log("Pas de message");
    }
  }
  printMessage();
  printMessage("Un message")

  // Exo 3.1 Tableaux typés
  const names : string[] = [];
  names.push("Alice");
  names.push("Bob");
  names.push("Charlie");

  function getNamesStart_A(namesArr: string[]): string[] {
    return namesArr.filter(name => name.startsWith("A"));
  }
  getNamesStart_A(names);

  // Exo 3.2 Objets complexes
  type User = {
    id : number,
    name : string,
    isAdmin : boolean
  };

  const [statut, setStatut] = useState<string>("user");
  const [user, setUser] = useState<User>({
    id: 1,
    name: "Alice",
    isAdmin: false,
  });

  function toggleAdmin() {
    setUser(prevUser => {
      const newIsAdmin = !prevUser.isAdmin;
      setStatut(newIsAdmin ? "admin" : "user");
      return { ...prevUser, isAdmin: newIsAdmin };
    });
  }

  // Exo 4.1 Définir une interface
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

  // Exo 4.2 Utiliser des interfaces dans des fonctions
  const reduction : number = 20;
  function applyDiscount(product : Product, reduction : number){
    const finalPrice = product.price * (100 - reduction) / 100;
    console.log(`Prix final après réduction : ${finalPrice}`);
    return(finalPrice);
  }
  applyDiscount(product, reduction);

  // Exo 5.1 Définir une classe
  class Person {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    greet(): string {
      return `Bonjour, je m'appelle ${this.name}.`;
    }
  }
  const person1 = new Person("Lorems2");
  console.log(person1.greet()); 

  // Exo 5.2 Héritage
  class Employee extends Person{
    role : string;
    constructor(name: string, role: string){
      super(name)
      this.role = role;
    }
    introduce(): string{
      return `Bonjour, je m'appelle ${this.name} et je suis un ${this.role}.`;
    }
  }
  const employee1 = new Employee("Bob", "manager");
  console.log(employee1.introduce());

  // Exo 6.1 Fonction générique
  function identity<Type>(args : Type): Type{
    return args
  }
  console.log(identity("test"))
  console.log(identity(13))

  // Exo 6.2 Classe générique
  class Storage<Type>{
    private items: Type[] = [];

    add(item : Type){
      this.items.push(item);
    }

    getAll(): Type[]{
      return this.items
    }
  }

  const stringStorage = new Storage<string>();
  stringStorage.add("Pomme");
  stringStorage.add("Banane");
  console.log(stringStorage.getAll());

  const numberStorage = new Storage<number>();
  numberStorage.add(5);
  numberStorage.add(13);
  console.log(numberStorage.getAll());

  // Exo 7.1 Gestion des erreurs
  function parseJson(json: string): unknown {
    try {
      const parsed = JSON.parse(json);
      console.log("Parsing réussi :", parsed);
      return parsed;
    } catch (error) {
      console.error("Erreur de parsing :", error);
      return undefined;
    }
  }
  
  // Test avec un JSON valide
  const validJson = '{"name": "Alice"}';
  console.log(parseJson(validJson));
  
  // Test avec un JSON invalide, génère une erreur
  // const invalidJson = "{invalid json}";
  // console.log(parseJson(invalidJson));

  // Exo 7.2 Typage sur une api externe
  interface UserApi {
    name : string,
    email : string,
    phone : number,
    company: {
      name: string;
    };
  }
  axios.get<UserApi[]>("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    const users = response.data;
    users.forEach(user => {
      console.log(`Nom: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Téléphone: ${user.phone}`);
      console.log(`Entreprise: ${user.company.name}`);
      console.log('---');
    });
  })
  .catch(error =>{
    console.log(error);
  });

  // Exo 8.1 Mapped types
  interface Product {
    id: number;
    name: string;
    price: number;
  }
  type ReadonlyProduct = Readonly<Product>;
  const readonlyProduct : ReadonlyProduct = {id: 1, name: "Banane", price: 2};
  // readonlyProduct.price = 10; /* Erreur IDE */

  // Exo 8.2 Utility types
  type PartialProduct = Partial<Product>;
  function updateProduct(product: Product, updates: PartialProduct): Product {
    return { ...product, ...updates }; // Fusionne l'objet existant avec les mises à jour
  }
  
  const defaultProduct: Product = { id: 1, name: "Banane", price: 2 };
  const updatedProduct = updateProduct(defaultProduct, { price: 3, name: "Pomme" });
  
  console.log(updatedProduct); // { id: 1, name: "Pomme", price: 3 }

  // Exo 9 Enums
  enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
  }
  
  function assignRole(role: Role) {
    console.log(`Rôle assigné : ${role}`);
  }
  
  assignRole(Role.Admin); // Rôle assigné : ADMIN
  assignRole(Role.User);  // Rôle assigné : USER

  // Exo 10 Discriminated Unions
  interface Dog {
    type: "dog";
    bark(): void;
  }
  
  interface Cat {
    type: "cat";
    meow(): void;
  }
  
  type Animal = Dog | Cat;
  
  function makeSound(animal: Animal) {
    if (animal.type === "dog") {
      animal.bark();
    } else if (animal.type === "cat") {
      animal.meow();
    }
  }  

  const dog: Dog = {
    type: "dog",
    bark: () => console.log("Woof!"),
  };
  
  const cat: Cat = {
    type: "cat",
    meow: () => console.log("Miou!"),
  };
  
  makeSound(dog); // Affiche "Woof!"
  makeSound(cat); // Affiche "Meow!"

  return (
    <div>
      <p>EXO</p>
      <button onClick={() => toggleAdmin()}>Toggle Admin</button>
      <p>{user.name} is {statut}</p>
    </div>
  )
}