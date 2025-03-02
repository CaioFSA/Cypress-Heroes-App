class HomePage {

    selectorsList() {
        return {
            homePageGrid: '#root',
            createNewHeroButton: "[href='/heroes/new']",
            likeButton: "[data-cy='like']", //.eq(0)
            fansNumber: "[data-cy='fans']", //.eq(0)
            hireButton: "[data-cy='money']", //.eq(0)
            savesNumber: "[data-cy='saves']", //.eq(0)
            confirmButtonHire: '.bg-red-600',
            priceNumber: "[data-cy='price']", //.eq(0)
            savesNumber: "[data-cy='saves']", //.eq(0)
            initialCard: "[data-cy='hero-card']", //.eq(0)
            confirmationHireCard: ".gap-4",
            heroName: "[data-cy='name']", //.eq(0)
            heroNameConfirmModal: '.gap-4 > .flex-col > .mb-1',
            priceTextConfirmModal: 'p.text-sm',
            declineButtonHire: '.gap-4 > .gap-2 > .text-gray-800',
            trashButtonHero: "[data-cy='trash']",
            confirmationButtonTrashHero: '.bg-red-600',
            declineButtonTrash: '.gap-4 > .gap-2 > .text-gray-800',
            editButton: "[data-cy='pencil']", //.eq(0)
            logoutButton: ".border-gray-300", //.eq(0)
            
        }
    }

    checkHomePage() {
        cy.location('pathname').should('eq', '/heroes')
        cy.get(this.selectorsList().homePageGrid).should('be.visible')
    }

    clickCreateNewHeroButton() {
        cy.get(this.selectorsList().createNewHeroButton).click({ force: true })
    }

    clickLikeButton() {
        cy.get(this.selectorsList().likeButton).click({ force: true })
    }

    clickLikeAndVerifyIncrement() {
        // Captura o valor inicial de likes
        cy.get(this.selectorsList().fansNumber).eq(0)
          .invoke('text')
          .then((textBefore) => {
            // Converte a string para número, utilizando base 10
            const initialLikes = parseInt(textBefore.trim(), 10);
            
            // Clica no botão de like
            cy.get(this.selectorsList().likeButton).eq(0).click();
    
            // Após o clique, captura o novo valor exibido
            cy.get(this.selectorsList().fansNumber).eq(0)
              .invoke('text')
              .then((textAfter) => {
                const updatedLikes = parseInt(textAfter.trim(), 10);
                // Verifica, utilizando uma assertiva do Chai, se o valor aumentou
                expect(updatedLikes).to.be.greaterThan(initialLikes);
            });
        });
    }

    // Captura informações do CARD INICIAL (preço sem "$")
    getInitialCardInfo() {
        const selectors = this.selectorsList();
        return cy.get(selectors.initialCard).eq(0).then(($card) => {
            // Extrai o preço e remove o "$"
            const priceText = $card.find(selectors.priceNumber).text().trim();
            const priceWithoutSymbol = priceText.replace(/[^\d]/g, ''); // Remove tudo que não é dígito
            
            return {
                price: priceWithoutSymbol, // Retorna apenas o número (ex: "2000")
                fans: $card.find(selectors.fansNumber).text().trim(),
                saves: $card.find(selectors.savesNumber).text().trim(),
                heroName: $card.find(selectors.heroName).text().trim(),
            };
        });
    }

    // Verifica informações no MODAL DE CONFIRMAÇÃO (com tratamento de erro)
    verifyConfirmationModal(expectedHeroName, expectedPrice) {
        const selectors = this.selectorsList();
        
        // Verifica o nome do herói
        cy.get(selectors.heroNameConfirmModal)
            .should('contain', expectedHeroName);

        // Extrai e valida o preço (com interrogação no final)
        cy.get(selectors.priceTextConfirmModal)
            .invoke('text')
            .then((fullText) => {
                // Passo 1: Log para depuração
                cy.log(`Texto completo do preço no modal: "${fullText}"`);

                // Passo 2: Regex para extrair números antes de não-dígitos finais
                const priceMatch = fullText.match(/(\d+)(?=\D*$)/);
                
                // Verifica se encontrou um número
                expect(priceMatch, `Nenhum preço encontrado no texto: "${fullText}"`).to.not.be.null;

                // Passo 3: Comparação
                const extractedPrice = priceMatch[1]; // Usa o grupo de captura
                expect(extractedPrice).to.equal(expectedPrice);
            });
    }    

    // Abre o modal de confirmação
    openHireConfirmation() {
        const selectors = this.selectorsList();
        cy.get(selectors.initialCard).eq(0).find(selectors.hireButton).click();
    }

    // Confirma o hire
    confirmHire() {
        const selectors = this.selectorsList();
        cy.get(selectors.confirmButtonHire).click();
    }
    
    // Cancela o hire
    clickDeclineButtonHire() {
        cy.get(this.selectorsList().declineButtonHire).click();
    } 

    
    getHeroName() {
        const selectors = this.selectorsList();
        return cy.get(selectors.initialCard).eq(0)
            .find(selectors.heroName)
            .invoke('text')
            .then((text) => text.trim());
    }

    // Verifica APENAS o nome do herói no modal
    verifyHeroNameModal(expectedHeroName) {
        const selectors = this.selectorsList();
        cy.get(selectors.heroNameConfirmModal)
            .should('contain', expectedHeroName)
            .and('be.visible'); // Verifica visibilidade
    }

    // Abre o modal de confirmação
    openTrashConfirmation() {
        const selectors = this.selectorsList();
        cy.get(selectors.initialCard).eq(0)
            .find(selectors.trashButtonHero)
            .click();
    }

    // Confirma o trash
    confirmTrash() {
        const selectors = this.selectorsList();
        cy.get(selectors.confirmationButtonTrashHero).click();
    }

    // Verifica se o texto do heroName NÃO é o esperado após a confirmação
    verifyHeroNameTextNotVisible(expectedHeroName) {
        const selectors = this.selectorsList();
        cy.get(selectors.initialCard).eq(0)
            .find(selectors.heroName)
            .invoke('text')
            .then((currentText) => {
                expect(currentText.trim()).not.to.equal(expectedHeroName); // Verifica se o texto mudou
            });
    }

    clickDeclineButtonTrash() {
        cy.get(this.selectorsList().declineButtonTrash).click();
    }
    
    clickLogoutButton() {
        cy.get(this.selectorsList().logoutButton).eq(0).click();
    }

    clickEditButton() {
        cy.get(this.selectorsList().editButton).eq(0).click()
       
    }
    
    getHeroOriginalName(callback) {
        cy.get('.shadow-md').first().within(() => {
            cy.get('[data-cy="name"]').first()
                .should('be.visible')
                .invoke('text')
                .then((name) => callback(name.trim()));
        });
        return this; // Permite encadeamento
    }
    
    verifyDeletHero(heroName) {
        const selectors = this.selectorsList();
        cy.get(selectors.heroName).eq(0).should(($container) => {
            expect($container.text()).not.to.include(heroName);
          });
          return this;
    }



}


export default HomePage