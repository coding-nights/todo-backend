import PG from 'pg';
const {Pool} = PG;

const PoolConnection = new Pool();
export default PoolConnection;