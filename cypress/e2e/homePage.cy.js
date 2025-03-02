import userData from '../fixtures/loginPageData.json'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'

const loginPage = new LoginPage()
const homePage = new HomePage()


describe('Dar like em um "Hero"', () => {
    it('Deve aumentar o número de likes após clicar no botão', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
        homePage.clickLikeAndVerifyIncrement()
    });
});

describe('Contratar um "Hero"', () => {
    it('Deve aumentar o número de "Saves" após clicar no botão "Hire"', () => {
        // Login
        loginPage.accessLoginPage();
        loginPage.clickLoginButton();
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password);
        homePage.checkHomePage();

        // Passo 1: Capturar informações iniciais
        homePage.getInitialCardInfo().then((initialInfo) => {
            const { price, saves, heroName } = initialInfo;
            const initialSavesNumber = parseInt(saves, 10); // Converte para número

            // Passo 2: Abrir o modal de confirmação
            homePage.openHireConfirmation();

            // Passo 3: Validar informações no modal
            homePage.verifyConfirmationModal(heroName, price);

            // Passo 4: Confirmar a contratação
            homePage.confirmHire();

            // Passo 5: Verificar se os "Saves" aumentaram
            homePage.getInitialCardInfo().then((newInfo) => {
                const newSavesNumber = parseInt(newInfo.saves, 10); // Converte para número
                expect(newSavesNumber).to.equal(initialSavesNumber + 1); // Verifica incremento
            });
        });
    });
});

describe('Contratar um "Hero" mas desistir no final', () => {
    it('Deve fechar o modal de confirmação', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
        homePage.openHireConfirmation()
        homePage.clickDeclineButtonHire()
        homePage.checkHomePage()
    });
});

describe('Excluir um "Hero" na homePage', () => {
    it('Deve excluir o "Hero"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
         // Passo 1: Capturar o nome do herói no card inicial
         homePage.getHeroName().then((heroName) => {
            
            // Passo 2: Abrir o modal de confirmação
            homePage.openTrashConfirmation();

            // Passo 3: Verificar o nome no modal
            homePage.verifyHeroNameModal(heroName);

            // Passo 4: Confirmar o trash
            homePage.confirmTrash();

            // Passo 5: Verificar se o nome NÃO está mais visível
            homePage.verifyHeroNameTextNotVisible(heroName);
        });
    });
});

describe('Excluir um "Hero" na homePage mas desistir no final', () => {
    it('Desistir de excluir "Hero"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
        homePage.openTrashConfirmation()
        homePage.clickDeclineButtonTrash()
        homePage.checkHomePage()
    });
});

describe('Fazer "Logout"', () => {
    it('Fazer "Logout" e voltar pra página de "Login"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
        homePage.clickLogoutButton()
        loginPage.checkHomePage()
    });
});


