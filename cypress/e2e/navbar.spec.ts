describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("nav").should("exist");
  });
});
