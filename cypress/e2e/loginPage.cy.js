import userData from '../fixtures/loginPageData.json'
import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePage'


const loginPage = new LoginPage()
const homePage = new HomePage()


describe('Login com usuario/email valido', () => {
    it('Deve fazer login com um usuário válido', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, userData.userSuccess.password)
        homePage.checkHomePage()
    });
});

describe('Tentar logar com um email não registrado', () => {
    it('Deve aparecer "Invalid email or password"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userFailButValid.email, userData.userFailButValid.password)
        loginPage.checkErrorMessages("Invalid email or password")
    });
});

describe('Tentar logar com credenciais invalidas', () => {
    it('Deve aparecer "Email is not valid"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userFailInvalid.email, userData.userFailInvalid.password)
        loginPage.checkErrorMessages("Email is not valid")
    });
});

describe('Tentar logar sem preencher campo "Email"', () => {
    it('Deve aparecer "Email is required"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(null, userData.userSuccess.password)
        loginPage.checkErrorMessages("Email is required")
    });
});

describe('Tentar logar sem preencher campo "Password", com email valido', () => {
    it('Deve aparecer "Password is required"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userSuccess.email, null)
        loginPage.checkErrorMessages("Password is required")
    });
});

describe('Tentar logar sem preencher campo "Password", com email invalido', () => {
    it('Deve aparecer "Password is required" e "Email is not valid"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(userData.userFailInvalid.email, null)
        const expectedMessages = ['Email is not valid', 'Password is required']
        loginPage.checkMultipleErrorMessages(expectedMessages)
    });
});

describe('Tentar logar sem preencher nenhum campo', () => {
    it('Deve aparecer "Password is required" e "Email is required"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLoginButton()
        loginPage.loginWithAnyUser(null, null)
        const expectedMessages = ['Email is required', 'Password is required']
        loginPage.checkMultipleErrorMessages(expectedMessages)
    });
});

describe('Tentar dar "Like" em um "Hero"', () => {
    it('Deve aparecer "You must log in to like"', () => {
        loginPage.accessLoginPage()
        loginPage.clickLikeButtonLoginPage()
        loginPage.checkMustLoginGrid()
        loginPage.checkloginPageLikeHireErrorMessage("You must log in to like.")
        loginPage.clickOkButtonLoginPage()
    });
});

describe('Tentar dar "Hire" em um "Hero"', () => {
    it('Deve aparecer "You must log in to hire this hero"', () => {
        loginPage.accessLoginPage()
        loginPage.clickHireButtonLoginPage()
        loginPage.checkMustLoginGrid()
        loginPage.checkloginPageLikeHireErrorMessage("You must log in to hire this hero.")
        loginPage.clickOkButtonLoginPage()
    });
});