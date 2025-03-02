import userData from '../fixtures/loginPageData.json'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'
import CreateNewHero from '../pages/createNewHero'

const loginPage = new LoginPage()
const homePage = new HomePage()
const createNewHero = new CreateNewHero()


describe('Deve preencher o formulário corretamente', () => {
    it('Deve preencher o formulário corretamente', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, data.price, data.fans, data.saves, data.powers, data.avatarPath)
        });
    });
});


describe('Deve preencher o formulário sem "Avatar"', () => {
    it('Deve criar o "Hero" sem foto', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, data.price, data.fans, data.saves, data.powers, null)
        });
    });
});

describe('Deve preencher o formulário sem "Name"', () => {
    it('Tentar criar "Hero" sem "Name"', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(null, data.price, data.fans, data.saves, data.powers, data.avatarPath)
            createNewHero.checkErrorMessages("Name is required")
        });
    });
});

describe('Deve preencher o formulário sem "Price"', () => {
    it('Tentar criar "Hero" sem "Price"', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, null, data.fans, data.saves, data.powers, data.avatarPath)
            createNewHero.checkErrorMessages("Price is required")
        });
    });
});

describe('Deve preencher o formulário sem "Fans"', () => {
    it('Tentar criar "Hero" sem "Fans"', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, data.price, null, data.saves, data.powers, data.avatarPath)
            createNewHero.checkErrorMessages("Fans is required")
        });
    });
});

describe('Deve preencher o formulário sem "Saves"', () => {
    it('Tentar criar "Hero" sem "Saves"', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, data.price, data.fans, null, data.powers, data.avatarPath)
            createNewHero.checkErrorMessages("Saves is required")
        });
    });
});

describe('Deve preencher o formulário sem "Powers"', () => {
    it('Tentar criar "Hero" sem "Powers"', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(data.name, data.price, data.fans, data.saves, null, data.avatarPath)
            createNewHero.checkErrorMessages("Powers is required")
        });
    });
});

describe('Não deve preencher nada do formulário', () => {
    it('Tentar criar "Hero" sem preencher nada', () => {
        cy.fixture('createNewHeroPageData.json').then((data) => {
            loginPage.accessLoginPage()
            loginPage.clickLoginButton()
            loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
            homePage.checkHomePage()
            homePage.clickCreateNewHeroButton()
            createNewHero.fillForm(null, null, null, null, null, null)
            const expectedMessages = [
                "Name is required",
                "Price is required", 
                "Fans is required",
                "Saves is required",
                "Powers is required"
            ]
            createNewHero.checkMultipleErrorMessages(expectedMessages)
        });
    });
});