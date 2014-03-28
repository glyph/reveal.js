
cache()

import sys

from txsockjs.factory import SockJSResource
from twisted.protocols.basic import LineReceiver
from twisted.internet.protocol import Factory

class ClientConnection(LineReceiver):
    def connectionMade(self):
        pass


    def lineReceived(self, line):
        print("BROADCAST:", line)
        for connection in sys.hub:
            connection.sendLine(line)



resource = SockJSResource(Factory.forProtocol(ClientConnection))
