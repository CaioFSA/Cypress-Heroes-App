class EditHeroPage {
    selectorsList() {
        const selectors = {
            nameField: '[data-cy="nameInput"]',
            priceField: '[data-cy="priceInput"]',
            fansField: '[data-cy="fansInput"]',
            savesField: '[data-cy="savesInput"]',
            powersSelect: '[data-cy="powersSelect"]',
            avatarField: '[data-cy="avatarFile"]',
            submitButton: '.bg-blue-700', //.eq(0)
            errorMessages: '.text-red-500',
            deletHeroButton: "[type='button']",
            deletHeroGrid: '.bg-white',
            yesButtonDeletHeroGrid: '.bg-red-600', //.eq(1)
            cyHeroesHomePageButton: "[href='/']",
        }
        return selectors
    }

    fillForm({ 
        name = null, 
        price = null, 
        fans = null, 
        saves = null, 
        power = null, 
        avatarPath = null 
    }) {
        // Apenas preenche campos e submete
        if (name) cy.get(this.selectorsList().nameField).clear().type(name);
        if (price) cy.get(this.selectorsList().priceField).clear().type(price);
        if (fans) cy.get(this.selectorsList().fansField).clear().type(fans);
        if (saves) cy.get(this.selectorsList().savesField).clear().type(saves);
        if (power) cy.get(this.selectorsList().powersSelect).select(power);
        if (avatarPath) cy.get(this.selectorsList().avatarField).selectFile(avatarPath);
        
        cy.get(this.selectorsList().submitButton).eq(1).click();
    }

    static generateTestHero() {
        return {
            updatedInfo: {
                name: `Cyberonic_${Math.floor(Math.random() * 1000)}`,
                price: `1_${Math.floor(Math.random() * 1000)}`,
                fans: `1_${Math.floor(Math.random() * 100)}`,
                saves: `1_${Math.floor(Math.random() * 100)}`,
                powers: ['Flying'],
                avatar: 'cypress/fixtures/img/hero7.png'
            }
        };
    }

    clearAllFields() {
        cy.get(this.selectorsList().nameField).clear();
        cy.get(this.selectorsList().priceField).clear();
        cy.get(this.selectorsList().fansField).clear();
        cy.get(this.selectorsList().savesField).clear();
        
        // Para resetar o select (ajuste conforme suas opções)
        cy.get(this.selectorsList().powersSelect).invoke('val', '').trigger('change');
        
        // Para limpar o input de arquivo (requer estratégia específica)
        cy.get(this.selectorsList().avatarField).then(input => {
            const nativeInput = input[0];
            nativeInput.value = '';
            input.trigger('change', { force: true });
        });

        return this;
    }

    checkErrorMessages(expectedMessage) {
        cy.get(this.selectorsList().errorMessages)
        .should('be.visible') // Verifica se a mensagem de erro está visível
        .and('have.text', expectedMessage); // Verifica se o texto da mensagem é o esperado
    }

    clickdeletHeroButton() {
        cy.get(this.selectorsList().deletHeroButton).click()
    }

    checkDeletHeroGrid() {
        cy.get(this.selectorsList().deletHeroGrid)
        .should('be.visible')
    }

    clickYesButtonDeletHeroGrid() {
        cy.get(this.selectorsList().yesButtonDeletHeroGrid).eq(1).click()
    }

    clickCyHeroesHomePageButton() {
        cy.get(this.selectorsList().cyHeroesHomePageButton).click()
    }

   
}

export default EditHeroPage