import {MongoClient} from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

(async () => {
    await client.connect();
})()

export const db = client.db('warriorsApp');
db.collection('warriors');