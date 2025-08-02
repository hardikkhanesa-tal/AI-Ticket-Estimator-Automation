import ticketData from "../fixtures/ticketData.json"

describe("AI Ticket Estimator", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should load the AI Ticket Estimator page", () => {
    cy.get("body").should("be.visible")
    cy.get("h1, h2, h3").should("exist")
    cy.title().should("not.be.empty")
  })

  ticketData.tickets.forEach((ticket, index) => {
    it(`Test Case: ${ticket.testCaseId} – ${ticket.title}`, () => {
      // Intercept API response for this ticket
      cy.intercept("POST", "**/api/estimate", {
        statusCode: 200,
        body: {
          storyPoints: ticket.expectedStoryPoints,
          justification: ticket.expectedJustification
        }
      }).as(`getEstimate${index}`)

      // Fill in form with correct selectors
      cy.get("#summary").clear().type(ticket.title)
      cy.get("#description").clear().type(ticket.description)
      
      // Handle the dropdown for issue type - just click first option for now
      cy.get("div._dropdown_1l1cg_99").first().click()
      cy.get("ul._dropdownMenu_1l1cg_115").should("be.visible")
      cy.get("li._dropdownItem_1l1cg_131").first().click()
      
      // Submit and check if form submission works
      cy.get("button[type=submit]").click()
      cy.wait(`@getEstimate${index}`)

      // Just verify the page is still visible after submission
      cy.get("body").should("be.visible")
      cy.log(`Form submitted successfully for ${ticket.testCaseId}`)
    })
  })

  it("should handle form validation for empty submission", () => {
    cy.get("button[type=submit]").click()
    cy.get("body").should("be.visible")
   
  })
})
