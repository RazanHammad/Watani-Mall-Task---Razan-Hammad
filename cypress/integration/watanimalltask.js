/// <reference types="cypress" />
describe("verify end to end scenario to visit monitors in watanimol and filter the result to asus and add the items to cart",() =>{
    before(() => {
        cy.visit("https://watanimall.com")
        cy.url().should("include","/")
    })
    
})
