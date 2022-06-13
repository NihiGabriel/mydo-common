/**
 Abtsract class listener
 @class listener
 * */



const nats = require('node-nats-streaming');
const Subjects = require('./subjects');


class Listener {

    // private #client too connect to nat
#client

//protected _acWait to acknowleged nats message
_ackWait = 5 * 1000;

subject = Subjects
queueGroupName; //public property

constructor(client){
    if (this.constructor === Listener){
        throw new Error('Listner cannot be instabtiated')
    }

    this.#client = client;
}

  get client(){
      return this.#client;
  }

  set client(client){
      this.#client = client;
  }

  subscriptionOptions(){

    return this.#client
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setAckWait(this._ackWait)
    .setStartAtTimeDelta( 1 * 1000 )
    .setDurableName(this.queueGroupName);

  }

  listen(){

        const subscription = this.#client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )


        subscription.on('message', (msg) => {
            console.log(`Message received from ${this.subject} / ${this.queueGroupName}`)

            const parseData = this.parseMessage(msg);

            this.onMessage(parseData, msg);
        })

  }

  parseMessage(msg){

        const data = msg.getData();
        return typeof(data) === 'string'
        ? JSON.parse(data) 
        : JSON.parse(data.toString('utf-8'))
  }

  onMessage(data, msg){

  }

}

module.exports = Listener;