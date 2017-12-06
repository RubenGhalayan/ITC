from pprint import pprint

# Function gets data from given file
# param - string: string which includes file name
# return - mixerd: returns dictionary or None
def getData(infoFile):
    data = {}
    try:
        f = open(infoFile, 'r')
    except IOError:
        print "There was a problem while openning file"
        return None
    
    for line in f:
        info = line.split(' ')
        key = info[0] + ' ' + info[1]
        value = info[2]
        value = value[:-1]
        if key in data.keys():
            print "Keys are not unique"
            return None
        else:
            data[key] = value

    f.close()
    return data


# Function returns value corresponding to the given key
# param - string: key
# return - mixed: value corresponding to the given key or None
def findByKey(key, **data):
    for keys in data:
        if key == keys:
            return data[key]
    else: 
        return None

# Function returns list of keys corresponding to the given value
# param - int: value
# return - mixed: list of keys or None
def findByValue(value, **data):
    keys = []
    for key, val in data.items():
        try:
            if value == int (val):
                keys.append(key)
        except ValueError:
            print "Invalid value"
            return None
    if len(keys) > 0:
        return keys
    else:
        return None
