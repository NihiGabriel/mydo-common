/**
 *  Absatract Class Listener
 * @class Listener
 */

 const nats = require('node-nats-streaming');
 const Subjects = require('./subjects');

 class Listener{

    // private client to connect to nats
    #client;

    // protected _ackwait to acknowledge nats message
    _ackwait = 5 * 60;

    subject = Subjects;
    queueGroupName; // public property

    constructor(client){
        if(this.constructor === Listener){
            throw new Error(`Listener cannot be instantiated`);
        }

        this.#client = client;
    }

    // getters is used to get a private and protected property of a class
    get client(){
        return this.#client;
    }

    set client(client){
        this.#client = client;
    }

    subscriptionOptions(){

        return this.#client
        .subscriptionOptions()
        .setDeliverAllAvailable()  // get all the messages inside the channels
        .setManualAckMode(true)     // acknowledging a message manually by setting to true
        .setAckWait(this._ackwait) // settin a waiting time for nats
        .setDurableName(this.queueGroupName); // setting a durable name
    }

    listen(){

        const subscription = this.#client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg) => {

            console.log(`Message recieved from ${this.subject}/ ${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);

            this.unMessage(parsedData, msg);
        })
    }

    parseMessage(msg){
        const data = msg.getData();
        return typeof(data) === 'string' 
        ? JSON.parse(data) 
        : JSON.parse(data.toString('utf8'))
    }

    onMessage(data, msg)
 }

 module.exports = Listener;