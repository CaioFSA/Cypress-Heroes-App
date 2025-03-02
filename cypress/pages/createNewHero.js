class CreateNewHero {

    selectorsList() {
        const selectors = {
           nameField: "[name='name']",
           priceField: "[name='price']",
           fansField: "[name='fans']",
           savesField: "[name='saves']",
           powersSelector: "[name='powers']",
           avatarField: "[data-cy='avatarFile']",
           submitButton: "[novalidate=''] .text-white",
           errorMessages: '.text-red-500',
        }

        return selectors
    }

    fillForm(name = null, price = null, fans = null, saves = null, powers = [], avatarPath = null) {
        if (name) {
            cy.get(this.selectorsList().nameField).clear().type(name);
        }
        if (price) {
            cy.get(this.selectorsList().priceField).clear().type(price);
        }
        if (fans) {
            cy.get(this.selectorsList().fansField).clear().type(fans);
        }
        if (saves) {
            cy.get(this.selectorsList().savesField).clear().type(saves);
        }
        if (Array.isArray(powers) && powers.length > 0) {
            powers.forEach(power => {
                cy.get(this.selectorsList().powersSelector).select(power);
            });
        }
        if (avatarPath) {
            cy.get(this.selectorsList().avatarField).attachFile(avatarPath);
        }
        cy.get(this.selectorsList().submitButton).click();
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

    
}

export default CreateNewHero