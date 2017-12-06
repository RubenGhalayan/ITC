import functions
from pprint import pprint 

fileName = raw_input("Enter informative file name: ")
option = raw_input("Enter searching option (key / value): ")

data = functions.getData(fileName)
if data == None:
    print "Get data failed"
    exit()

# Function returns search result
# param - Nope
# return - mixed: None, int or string
def search():
    if option == 'key':
        key = raw_input("Enter key to search: ")
        value = functions.findByKey(key, **data)
        return value
    elif option == 'value':
        try:
            value = int (raw_input("Enter value to search: "))
        except ValueError:
            print "Inavlid value"
            return None
        keys = functions.findByValue(value, **data)
        return keys
    else:
        print "Unknown option"
        return None

result = search()
if result == None:
    print "Search failed"
else:
    print "Search result: "
    pprint(result)
