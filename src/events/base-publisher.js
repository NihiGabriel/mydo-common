/** Abstract Class Publisher 
 * 
 * @class Publisher
 * 
*/

const nats = require('node-nats-streaming');
const Subjects = require('./subjects');

class Publisher{

    subject = Subjects;

    // private property
    #client;

    constructor(client){
        if(this.constructor === Publisher){
            throw new Error(`Publisher cannot be instantiated`)
        }
        this.#client = client;
    }

    publish(data){

        return new Promise((resolve, reject) => {

            this.#client.publish(this.subject, JSON.stringify(data), (err) => {   // publish will publish to the cluster and wait for an acknowledgement

                if(err){
                    return reject(err);
                }

                console.log(`Event published to channel ${this.subject}`);
                resolve();

            })
        })
    }

}

module.exports = Publisher;