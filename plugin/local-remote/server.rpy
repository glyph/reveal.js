
cache()

import sys

from txsockjs.factory import SockJSResource
from twisted.protocols.basic import LineReceiver
from twisted.internet.protocol import Factory

if getattr(sys, 'hub', None) is None:
    sys.hub = []



class ServerConnection(LineReceiver):
    def connectionMade(self):
        sys.hub.append(self)


    def lineReceived(self, line):
        pass


    def connectionLost(self):
        sys.hub.remove(self)



resource = SockJSResource(Factory.forProtocol(ServerConnection))
