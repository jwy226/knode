var stompit = require('stompit');
var ylpServe = {
    'host': '172.16.8.121',
    'connectHeaders':{
        'login': 'ylp',
        'passcode': 'ylp.123',
        //'heart-beat': '5000,5000'
    }
};


var manager = new stompit.ConnectFailover([ylpServe], {
    'maxReconnects': 10
});

manager.connect(function(error, client, reconnect) {

    if (error) {
        console.log('connect error ' + error.message);
        return;
    }

    var subscribeHeaders = {
        'destination': 'test.payAnalysis.queue.data',
        'ack': 'auto'
    };

    client.subscribe(subscribeHeaders, function(error, message) {
        if (error) {
            console.log('subscribe error ' + error.message);
            return;
        }
        message.readString('utf-8', function(error, body) {
            if (error) {
                console.log('read message error ' + error.message);
                return;
            }
            console.log(typeof body)
            console.log('===test.payAnalysis.queue.data==='+Date.now()+'====' + body);
            message.ack();
        })
    })

    client.on('error', function(error) {
        reconnect();
    });
});

module.exports = async (io) => {



}