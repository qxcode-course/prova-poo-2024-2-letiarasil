function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa {
    private nome: string;
    private dinheiro: number;

    constructor(nome: string, dinheiro: number)  {
        this.nome = nome;
        this.dinheiro = dinheiro;
    }

    getNome() : string {
        return this.nome;
    }

    getDinheiro() : number {
        return this.dinheiro;
    }

    setDinheiro(valor: number) : void {
        this.dinheiro = valor;
    }

    toString() : string {
        return `${this.nome}:${this.dinheiro}`;
    }
}

class Moto {
    private custo: number;
    private motorista: Pessoa | null;
    private passageiro: Pessoa | null;

    constructor() {
        this.custo = 0;
        this.motorista = null;
        this.passageiro = null;
    }

    setMotorista (motorista: Pessoa) : boolean {
        if (this.motorista != null) {
            return false;
        }
        this.motorista = motorista;
        return true;
    }

    setPassageiro (passageiro: Pessoa) : boolean {
        if (this.motorista == null) {
            return false;
        }
        if (this.passageiro != null) {
            return false;
        }
        this.passageiro = passageiro;
        return true;
    }

    dirigir (km: number) : void {
        if (this.motorista == null || this.passageiro == null) {
            return;
        }
        this.custo += km;
        return;
    }

    deixarPassageiro() : void {
        if (this.passageiro == null) {
            return;
        }

        if (this.passageiro.getDinheiro() < this.custo) {
            console.log("fail: Passenger does not have enough money");

            this.passageiro.setDinheiro(0);
            console.log(this.passageiro + " leave");
            
            this.motorista?.setDinheiro(this.motorista?.getDinheiro() + this.custo); 
            this.custo = 0;
            this.passageiro = null;
            return;
        }

        this.passageiro.setDinheiro(this.passageiro.getDinheiro() - this.custo);
        console.log(this.passageiro + " leave");
        
        this.passageiro = null;
        this.motorista?.setDinheiro(this.motorista?.getDinheiro() + this.custo); 
        return; 
    }

    getCusto() : number {
        return this.custo;
    }

    getMotorista() : Pessoa | null {
        return this.motorista;
    }

    getPassageiro() : Pessoa | null {
        return this.passageiro;
    }

    toString() : string {
        if (this.motorista == null) {
            return `Cost: 0, Driver: None, Passenger: None`;
        }
        if (this.passageiro == null) {
            return `Cost: 0, Driver: ${this.motorista}, Passenger: None`;
        }
        
        return `Cost: ${this.custo}, Driver: ${this.motorista}, Passenger: ${this.passageiro}`;
    }
}

class Adapter {
    moto: Moto;

    constructor() {
        this.moto = new Moto();
    }

    setDriver(name: string, money: number): void {
        this.moto.setMotorista(new Pessoa (name, money));
    }

    setPassenger(name: string, money: number): void {
        this.moto.setPassageiro(new Pessoa (name, money));
    }

    drive(distance: number): void {
        this.moto.dirigir(distance);
    }

    leavePassenger(): void {
        this.moto.deixarPassageiro();
    }

    show(): void {
        console.log(this.moto.toString());
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
