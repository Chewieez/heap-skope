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

// SkopeManager.products.forEach(mineral => {
//     let processResult = null
//     do {
//         processResult = SkopeManager.process(mineral)
//         if (processResult.amount > 0) gemOrders.push(processResult)
//     } while (processResult.amount === 5)
// })

SkopeManager.products.forEach(mineral => {
    do {
        // loop to fill this container until until the gemOrder total is 0, meaning no gems left of that type.
        // run an order to process gems
        processResults = SkopeManager.process(mineral)
       gemOrders.push(processResults)
    } while (processResults.amount >= 5)
})


console.log("gemOrders: ", gemOrders)




/*
Create a generator for 30 storage containers, which is how many a hëap-skope
is equipped with.
*/
const gemContainerGenerator = function* () {
    let currentContainer = 1
    const maximumContainers = 30;
    
    while (currentContainer <= maximumContainers) {
        yield { "id": currentContainer, "type": "Mineral", "orders": [] }
        currentContainer++
    }
}
// create instance of gemContainerGenerator
const gemContainerFactory = gemContainerGenerator()

// create a new container
let currentContainer = gemContainerFactory.next().value;

// create currentContainerAmount to hold the amount of total kilograms in the container
let currentContainerAmount = 0;

// create final array to hold all of the containers. 
let heapSkopeContainers = [];


// put the processed orders into containers
gemOrders.forEach( order => {
    
      // check if currentContainer is not undefined, which means we are not out of available containers
      if (currentContainer) { 
  
          // push an order into the container
          currentContainer.orders.push(order);
  
          // increment the size of the current container to reflect this added order
          currentContainerAmount += order.amount;
              
          // check that the currentContainer plus the current order are more than what will fit in one container. If it is, push this full container to the heapSkopeContainers array and then create a new container
          if (currentContainerAmount + order.amount > 565) {
              // container is now full, push container to keapSkopeContainers
              heapSkopeContainers.push(currentContainer)
              // create a new container
              currentContainer = gemContainerFactory.next().value;
              currentContainerAmount = 0;
          }   
      }
  })
  
  // Check if a currentContainer exists and is not undefinted AND if this container is partially full, and then push to final heapSkopeContainer array
  if (currentContainer && currentContainer.orders.length > 0) {
      // push this last container into the heapSkopeContainers array
      heapSkopeContainers.push(currentContainer)
  }
  
console.log("heapSkopeContainers: ", heapSkopeContainers)