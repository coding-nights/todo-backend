import AccountController from '../controllers/account/accountController.js';
import AccountSchema from '../controllers/account/accountSchema.js';

const accountController = new AccountController();


const AccountRoutes = [
    {
        method: 'POST',
        address: '/account/create',
        controller: accountController.create,
        schema: AccountSchema.create
    },
    {
        method: 'POST',
        address: '/account/login',
        controller: accountController.login,
        schema: AccountSchema.login
    },
];

export default {AccountRoutes, AccountController};