import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import EditHeroPage from '../pages/editHeroPage';
import userData from '../fixtures/loginPageData.json';

const loginPage = new LoginPage();
const homePage = new HomePage();
const editHeroPage = new EditHeroPage();

describe('Editar perfil de "Hero"', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve editar perfil de "Hero" corretamente', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: testHero.updatedInfo.price,
            fans: testHero.updatedInfo.fans,
            saves: testHero.updatedInfo.saves,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
    });
});

describe('Editar perfil de "Hero" deixando o campo "Name" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve aparecer mensagem de erro', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: null,
            price: testHero.updatedInfo.price,
            fans: testHero.updatedInfo.fans,
            saves: testHero.updatedInfo.saves,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
        editHeroPage.checkErrorMessages("Name is required")
    });
});

describe('Editar perfil de "Hero" deixando o campo "Price" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve aparecer mensagem de erro', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: null,
            fans: testHero.updatedInfo.fans,
            saves: testHero.updatedInfo.saves,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
        editHeroPage.checkErrorMessages("Price is required")
    });
});

describe('Editar perfil de "Hero" deixando o campo "Fans" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve aparecer mensagem de erro', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: testHero.updatedInfo.price,
            fans: null,
            saves: testHero.updatedInfo.saves,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
        editHeroPage.checkErrorMessages("Fans is required")
    });
});

describe('Editar perfil de "Hero" deixando o campo "Saves" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve aparecer mensagem de erro', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: testHero.updatedInfo.price,
            fans: testHero.updatedInfo.fans,
            saves: null,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
        editHeroPage.checkErrorMessages("Saves is required")
    });
});

describe('Editar perfil de "Hero" deixando o campo "Powers" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Deve aparecer mensagem de erro', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: testHero.updatedInfo.price,
            fans: testHero.updatedInfo.fans,
            saves: testHero.updatedInfo.saves,
            power: null, // Assume seleção única
            avatarPath: testHero.updatedInfo.avatar
        });
        editHeroPage.checkErrorMessages("Powers is required")
    });
});

describe('Editar perfil de "Hero" deixando o campo "Avatar" em branco', () => {
    let originalHeroName;
    let testHero;

    before(() => {
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();
        homePage.getHeroOriginalName((name) => {
            originalHeroName = name;
        });
        testHero = EditHeroPage.generateTestHero();
    });

    it('Campo "Avatar" deve permanecer igual', () => { 
        homePage.clickEditButton(originalHeroName);
        editHeroPage.clearAllFields();
        editHeroPage.fillForm({
            name: testHero.updatedInfo.name,
            price: testHero.updatedInfo.price,
            fans: testHero.updatedInfo.fans,
            saves: testHero.updatedInfo.saves,
            power: testHero.updatedInfo.powers[0], // Assume seleção única
            avatarPath: null
        });
    });
});

describe('Excluir "Hero" através da página de editar "Hero"', () => {
    it('Deve excluir "Hero"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
        homePage.getHeroName()
        homePage.clickEditButton()
        editHeroPage.clickdeletHeroButton()
        editHeroPage.checkDeletHeroGrid()
        editHeroPage.clickYesButtonDeletHeroGrid()
        editHeroPage.clickCyHeroesHomePageButton()
        homePage.verifyDeletHero()
    });
});