/// <reference types="cypress" />
describe("verify end to end scenario to visit monitors in watanimol and filter the result to asus and add the items to cart",() =>{
    before(() => {
        cy.visit("https://watanimall.com")
        cy.url().should("include","/")
    })

    beforeEach(() => {
        Cypress.Cookies.defaults({
            preserve: (cookie) => {
             return true
            },
          })
          
    })

    it('verify clicking on all cases tab',() => {
        cy.get("nav#nav ul li:nth-child(5) a").contains("جميع الفئات").click({waitForAnimations: false})
        cy.url().should("include","all-categories")
        cy.get("#main h1").contains("جميع الفئات")
    })

    it("verify clicking on monitors product category", () =>{
        cy.get("#main div.category-col:nth-child(3) a").click().should("have.attr","href","https://watanimall.com/product-category/monitors")
        cy.url().should("include","monitors")
        cy.get("#main h1").contains("MONITORS")
    })

    it("verify clicking on asus monitors product category filter", () =>{
        const filter = "13"
        cy.get("div[data-value='asus']").click().should("have.class","checked")
        cy.get("div[data-value='asus'] span").contains(filter)
        cy.get("div.product-col").should("have.length",filter)
    })

    it("verify filtering the asus product from low to high price and validate process",() => {
        cy.get(".orderby").select("price",{force:true})
        cy.get("form span span.jcf-select-text span").should("have.text","ترتيب حسب: الأدنى سعراً للأعلى")
        cy.wait(2000)

    })

    it("verify adding the first product to cart from the add to cart button and validate process added to cart",() => {
        cy.get("a[data-id='107188']").invoke('show').click({force: true})
        cy.get("div.header-mini-cart").should("be.visible")
        cy.get("div.header-mini-cart strong.product-name").contains("VG249Q1R")
        cy.get("input[id='qty107188']").should("have.attr","value","1")
        cy.get("div.header-mini-cart div.product-amount bdi").contains("940.00")
        cy.get("a.btn-cart span").contains("1")
      // cy.get("a.cart-close").click()
      cy.get("a.shopping-link").click()
    })

    it("verify adding second product (2 quantity) from the bdp ",() => {
        cy.get("div.product-col:nth-child(2)").click()
        cy.url().should("include","vg24vq")
        cy.get("#main h1").contains("VG24VQ")
        cy.get("div.quantity span.jcf-btn-inc").click()
        cy.get("button[name='add-to-cart']").should("have.attr","value","107055").click()
        cy.get("a.btn-cart span").contains("3")

    })

    it("verify removing one item from the added second product from the cart",() => {
        cy.get("div.cart-item:first-child a.cart-remove").click()
        cy.get("span.sub-total-amount").contains("2340")
        cy.get("a.cart-close").click()
        cy.get("a.btn-cart span").contains("2")
    })

   
    
})
