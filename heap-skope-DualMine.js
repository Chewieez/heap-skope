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

    // const elementsWeProduce = []

    // for (mine in GemMine) {
    //     for (mineral in mine) {
    //         elementsWeProduce.push(mineral);
    //     }
    // }

    // return elementsWeProduce




    return Object.create(null, {
        products: {
            get: () => {
                const elementsWeProduce = []
            
                for (mine in GemMine) {
                    for (mineral in GemMine[mine]) {
                        elementsWeProduce.push(mineral);   
                    }    
                }    
                return elementsWeProduce
            }
        },
        process: {
            value: function (requestedMineral) {
                
                /*
                Subtract 5 from the total kilograms available in
                the gem mine, but make sure you stop when there
                are no minerals left.
                */
                // create a variable to hold the amount of gems for each order
                let materialAmount = 0;
                //debugger

                /* Check if there are more than 5kg of the mineral remaining */
                for (mine in GemMine) {
                    if (GemMine[mine].hasOwnProperty(requestedMineral)) {
                        if (GemMine[mine][requestedMineral].kilograms >= 5) {
                            //make the gemOrder amount 5kg
                            materialAmount = 5;
                        // check if there are less than 5 and more than 0 gems left
                        } else if (GemMine[mine][requestedMineral].kilograms > 0) {
                            // assign the current gem amount to the amount to use for order
                            materialAmount = GemMine[mine][requestedMineral].kilograms
                        }

                        GemMine[mine][requestedMineral].kilograms -= materialAmount;
                    
                        return {
                            "mineral": requestedMineral,
                            "amount": materialAmount 
                        }
                    }
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




console.log("SkopeManager.products", SkopeManager.products)

SkopeManager.products.forEach(mineral => {
            let processResult = null
            do {
                processResult = SkopeManager.process(mineral)
                if (processResult.amount > 0) gemOrders.push(processResult)
            } while (processResult.amount === 5)
        })

           
        
            console.log("gemOrders: ", gemOrders)
            


