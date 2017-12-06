from Skype4Py import Skype
import rstr
import time

client = Skype(Transport='x11')
client.Attach()
user = 'armenuhi_qocharyan_im'

while (1):
    message = rstr.xeger('[A-Z][a-z]{3,8} [A-Z][a-z]{3,8}yan (19\d\d|20[0-1][0-7])\nPair: Ruben-Mary')
    client.SendMessage(user, message)
    time.sleep(600)
