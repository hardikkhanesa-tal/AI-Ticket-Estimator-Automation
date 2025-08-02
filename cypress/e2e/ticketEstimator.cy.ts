describe("AI Ticket Estimator", () => {
  beforeEach(() => {
    // Visit the AI Ticket Estimator page
    cy.visit("/")
  })

  it("should fill the form and get an estimate", () => {
    // Intercept API call if it exists
    cy.intercept("POST", "**/api/estimate", {
      statusCode: 200,
      body: {
        storyPoints: 4,
        justification: "Based on the complexity of the issue, including the detailed description and the fact that it is a Bug type issue, we estimate this will require 4 story points."
      }
    }).as("getEstimate")

    // Fill the form
    cy.get("[data-testid=issue-key]").type("4567")
    cy.get("[data-testid=title]").type("title")
    cy.get("[data-testid=description]").type("description")
    cy.get("[data-testid=issue-type]").select("Bug")

    // Click the submit button
    cy.get("[data-testid=submit-button]").click()

    // Wait for the API call (if it exists)
    cy.wait("@getEstimate")

    // Assert the result section is visible
    cy.get("[data-testid=result-section]").should("be.visible")

    // Assert the estimated story points
    cy.get("[data-testid=story-points]").should("contain", "4")

    // Assert the justification text
    cy.get("[data-testid=justification]").should("contain", "Based on the complexity of the issue")
  })

  it("should handle form validation", () => {
    // Try to submit without filling required fields
    cy.get("[data-testid=submit-button]").click()

    // Assert error messages or validation states
    // (This depends on the actual implementation)
  })

  it("should display different estimates for different issue types", () => {
    // Test with different issue types
    cy.get("[data-testid=issue-key]").type("4568")
    cy.get("[data-testid=title]").type("Feature Request")
    cy.get("[data-testid=description]").type("Add new feature to the application")
    cy.get("[data-testid=issue-type]").select("Feature")

    cy.intercept("POST", "**/api/estimate", {
      statusCode: 200,
      body: {
        storyPoints: 8,
        justification: "Feature requests typically require more story points due to the complexity of implementing new functionality."
      }
    }).as("getFeatureEstimate")

    cy.get("[data-testid=submit-button]").click()
    cy.wait("@getFeatureEstimate")

    cy.get("[data-testid=story-points]").should("contain", "8")
  })
})
