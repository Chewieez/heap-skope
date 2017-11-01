console.log("You are awesome!")

const gemHeapSkope = function () { 
    // No parameter needed Resource contained inside

    /*
    The gem mine does not exist outside the barricade of the
    hëap-skopes. The Lexscopistanians build the barricade
    around their facility AND the resource.
    
    a.k.a.
    Instead of being located in an outer scope to the
    function, the gem mine is enclosed by the scope of
    the `gemHeapSkope` function.
    */
    const GemMine = {
        "Mine1": {
            "Coal": {
                "kilograms": 5302
            },
            "Gold": {
                "kilograms": 2775
            }
        },
        "Mine2": {
            "Iron": {
                "kilograms": 3928
            },
            "Copper": {
                "kilograms": 901
            }
        }
    }

    

    /*
    Instead of processing the entirety of the resources in
    bulk - which is what the stâck-skope does - this skope
    will return an object that has a method for processing
    each type of mineral.
    
    We're exposing the functionality of this skope to code
    in the outer scope, so that the order in which minerals
    are processed can be customized.
    
    Hëap-skopes workshops can process 5 kilograms of a
    mineral with each work order. So every time the `process`
    function is invoked, subtract 5 from the amount of the
    requested mineral from the enclosed GemMine above.
    */
    return Object.create(null, {
        Mines: {
            get: () => Object.keys(GemMine)
        },
        Mine1: {
            get: () => Object.keys(GemMine.Mine1),
        },
        Mine2: {
            get: () => Object.keys(GemMine.Mine2)
        },
        process: {
            value: function (requestedMineral, mineNum) {
                
                /*
                Subtract 5 from the total kilograms available in
                the gem mine, but make sure you stop when there
                are no minerals left.
                */
                // create a variable to hold the amount of gems for each order
                let materialAmount = 0;
                /* Check if there are more than 5kg of the mineral remaining */
                if (GemMine[mineNum][requestedMineral].kilograms >= 5) {
                    //make the gemOrder amount 5kg
                    materialAmount = 5;
                
                // check if there are less than 5 and more than 0 gems left
                } else if (GemMine[mineNum][requestedMineral].kilograms > 0) {
                    // assign the current gem amount to the amount to use for order
                    materialAmount = GemMine[mineNum][requestedMineral].kilograms
                }

                GemMine[mineNum][requestedMineral].kilograms -= materialAmount;

                return {
                    "mineral": requestedMineral,
                    "amount": materialAmount 
                }
            }
        }
    })
}

/*
    The SkopeManager variable represents the object with the
    `process` method on it.
*/
const SkopeManager = gemHeapSkope()


/*
    Process the gems in any order you like until there none
    left in the gem mine.
*/
const gemOrders = []

console.log("SkopeManager.Mine1", SkopeManager.Mine1)
console.log("SkopeManager.Mine2", SkopeManager.Mine2)
console.log("SkopeManager.Mines", SkopeManager.Mines)


SkopeManager.Mine1.forEach(
    mineral => {
        let processResult = null
        do {
            processResult = SkopeManager.process(mineral, "Mine1")
            if (processResult.amount > 0) gemOrders.push(processResult)
        } while (processResult.amount === 5)
    }
)

SkopeManager.Mine2.forEach(
    mineral => {
        let processResult = null
        do {
            processResult = SkopeManager.process(mineral, "Mine2")
            if (processResult.amount > 0) gemOrders.push(processResult)
        } while (processResult.amount === 5)
    }
)
            
            console.log("gemOrders: ", gemOrders)
            

