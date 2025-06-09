export class CZooAnimal{
            #IdAnimal;
            #nombre;
            #JaulaNumero;
            #IdTypeAnimal; //1 felinos 2 aves 3 reptiles etc.
            #peso;  
            
            constructor(nombre,JaulaN,TypeAnimal,Peso){
                this.#IdAnimal= Math.floor(Math.random() * 999999);
                this.#nombre=nombre;
                this.#JaulaNumero=JaulaN;
                this.#IdTypeAnimal=TypeAnimal;
                this.#peso=Peso;
            }

            getJaula(){
                return this.#JaulaNumero;
            }
            getPeso(){
                return this.#peso;
            }
            getTipo(){
                return this.#IdTypeAnimal;
            }
            getNombre(){
                return this.#nombre;
            }
            getId(){
                return this.#IdAnimal;
            }
};
