/// <reference types="cypress" />

before(() => {
    cy.visit("http://localhost:4431/task.html")
})



/**it("waituntil",() => {
    cy.get("#b").click()
    //cy.waitUntil(() => true);
    //const result = cy.get("#res")
    cy.waitUntil(() => cy.window().then(win => win.foo === "bar"), {
        errorMsg: 'This is a custom error message', // overrides the default error message
        timeout: 2000, // waits up to 2000 ms, default to 5000
        interval: 500 // performs the check every 500 ms, default to 200
      });

})**/

it("Task",() => {
    cy.get("#b").click()
    cy.get("#res").wrap("#res").then((el)=> {
        //console.log(el.text)
     // const spann = el.find("res") 
     // cy.wrap(el).as("elem")
    

        if(el == "Fail")
        {
            console.log("Fail")
            throw new Error("Fail")
        }
  
        if(el == "Input Error")
        {
            console.log("Input Error")
            throw new Error("Input Error")
        }
  
        if(el == "Done")
        {
            console.log("IDone")
            throw new Error("IDone")
        }
  
        if(el== "Partial-Done")
        {
            
            console.log("Partial-Done")
            throw new Error("Partial-Done")
        }
    
 
    })

})
// the solution of task.html
it("solution", () => {
    cy.get("#res",{timeout:180000}).should("not.have.text","Runnig")
        .then((el)=>{
          if(!el.text().includes("Done"))
          {
            let failMessage = text.text()
            throw new Error("the job result is: " + failMessage)
          }
        })
})

