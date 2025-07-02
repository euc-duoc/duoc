function loginPrev() {
  cy.viewport(600, 1024)
  cy.visit('/')
}

describe('Spec prueba', () => {  
  it('ingresa', () => {
    cy.viewport(600, 1024)
    cy.visit('/') 
  })

  describe('login', () => {
    it('correcto', () => {
      loginPrev()
      cy.get('#nombreUsuario').click().type('{selectall}enrique')
      cy.get('#password').click().type('1234')
      cy.contains('ion-button', 'Ingresar con Storage').click()
      cy.location().should('match', /\/home$/)
    })

    it('incorrecto', () => {
      loginPrev()
      cy.get('#nombreUsuario').click().type('{selectall}aaa')
      cy.get('#password').click().type('xxxx')
      cy.contains('ion-button', 'Ingresar con Storage').click()
      cy.get('#errCont')
        .find('li')
        .should('have.text', 'No se encuentra un usuario con dicha contraseña.')
    })
  })  
})