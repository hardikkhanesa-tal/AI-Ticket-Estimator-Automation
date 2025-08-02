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

      // Fill in form
      cy.get("input[placeholder*='key']").first().clear().type(ticket.issueKey)
      cy.get("#summary").clear().type(ticket.title)
      cy.get("textarea[placeholder*='description']").first().clear().type(ticket.description)
      cy.get("select").first().select(ticket.issueType)

      // Submit and assert
      cy.get("button[type=submit]").click()
      cy.wait(`@getEstimate${index}`)

      cy.contains("Estimated Story Points").should("be.visible")
      cy.contains(ticket.expectedStoryPoints.toString()).should("be.visible")
      cy.contains(ticket.expectedJustification).should("be.visible")
    })
  })

  it("should handle form validation for empty submission", () => {
    cy.get("button[type=submit]").click()
    cy.get("body").should("be.visible")
   
  })
})
