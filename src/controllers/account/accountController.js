import Knex from 'knex';
import { v4 as uuid } from 'uuid';


const KnexPg = new Knex({client: 'pg'});

class AccountController {
    constructor() {
    }

    generateJWT(uid) {
        const jti = uuid();
        const exp = new Date();
        exp.setDate(new Date().getDate() + 5)
        return AccountController.app.jwt.sign({
            uid,
            exp: Math.floor(exp.getTime() / 1000),
            jti,
        });
    }


    async create(pool, req, res) {
        const uid = uuid();
        try {
            console.log('before generating jwt');
            const query = KnexPg('account.account').insert({
                account_id: uid,
                name: req.body.name,
                position: req.body.position,
                bio: req.body.bio
            }).toString();
            console.log(query);
            const result = await pool.query(query);
            console.log('after connection to database');
            const token = this.generateJWT(uid);
            console.log(token);
            res.send(token);
        } catch (e) {
            console.log(e);
        }

    }

    login(pool, req, res) {

    }
}


export default AccountController;