class LoginPage {
    selectorsList() {
        const selectors = {
            loginButton: '.border-gray-300', //.eq(0)
            likeButtonLoginPage: '.border-gray-300', //.eq(1)
            hireButtonLoginPage: '.border-gray-300', //.eq(2)
            okButtonLoginPage: '.justify-end .border-gray-300', 
            mustLoginGrid: '.bg-white',
            emailField: "[name='email']",
            passwordField: "[name='password']",
            signInButton: '.bg-blue-700',
            errorMessages: '.text-red-500',
            loginPageLikeHireErrorMessage: '.gap-4 > .flex-col > .mb-1',
            checkHomePage: '.max-w-5xl',
        }
        
        return selectors
    }

    accessLoginPage() {
        cy.visit('http://localhost:3000')
    }

    clickLoginButton() {
        cy.get(this.selectorsList().loginButton).eq(0).click({ force: true })
    }

    clickLikeButtonLoginPage() {
        cy.get(this.selectorsList().likeButtonLoginPage).eq(1).click({ force: true })
    }

    clickHireButtonLoginPage() {
        cy.get(this.selectorsList().hireButtonLoginPage).eq(2).click({ force: true })
    }

    clickOkButtonLoginPage() {
        cy.get(this.selectorsList().okButtonLoginPage).click({ force: true })
    }

    checkMustLoginGrid() {
        cy.get(this.selectorsList().mustLoginGrid)
        .should('be.visible') // Verifica se a janela esta aberta
    }
    
    loginWithAnyUser(email = null, password = null) {
        if (email) {
        cy.get(this.selectorsList().emailField).type(email)
        }
        if (password) {
        cy.get(this.selectorsList().passwordField).type(password)
        }
        cy.get(this.selectorsList().signInButton).click()
    }

    checkloginPageLikeHireErrorMessage(expectedMessage) {
        cy.get(this.selectorsList().loginPageLikeHireErrorMessage)
        .should('be.visible') // Verifica se a mensagem está visível
        .and('have.text', expectedMessage); // Verifica se o texto da mensagem é o esperado
    }

    checkErrorMessages(expectedMessage) {
        cy.get(this.selectorsList().errorMessages)
          .should('be.visible') // Verifica se a mensagem de erro está visível
          .and('have.text', expectedMessage); // Verifica se o texto da mensagem é o esperado
    }

    checkMultipleErrorMessages(expectedMessages) {
        cy.get(this.selectorsList().errorMessages)
            .each(($el, index) => {
            // Verifica se cada mensagem de erro corresponde ao texto esperado
            expect($el.text()).to.equal(expectedMessages[index]);
        });
    }

    checkHomePage() {
        cy.get(this.selectorsList().checkHomePage);
    }

    
}

export default LoginPage