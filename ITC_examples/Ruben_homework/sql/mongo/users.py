import argparse
import pymongo
import pprint
from pymongo import MongoClient

def pipeAggregate(db, pipe1, pipe2):
    print("Avg Scores")
    pprint.pprint(list(db.aggregate(pipe1)))
    print("MIN and MAX Scores")
    pprint.pprint(list(db.aggregate(pipe2)))


def database(db):
    db.insert({"Name":"Ruben", "ITC":8, "Exams":{"a":{"Subject":"C++", "Score":6}, "b":{"Subject": "Python", "Score":8}}})
    db.insert({"Name":"Vachagan", "ITC":8, "Exams":{"a":{"Subject":"C++", "Score":8}, "b":{"Subject": "Python", "Score":10}}})
    db.insert({"Name":"Smbat", "ITC":7, "Exams":{"a":{"Subject":"C++", "Score":8}, "b":{"Subject": "Python", "Score":9}}})
    pipe1 = [{"$group":{"_id" : {"Name":'$Name',"ITC":'$ITC'},"AVG":{"$avg":'$Exams.a.Score'}}}]
    pipe2 = [{"$group":{"_id":{"ITC":"$ITC", "Subject":"$Exams.a.Subject"}, "MIN":{"$min": "$Exams.a.Score"}, "MAX":{"$max":"$Exams.a.Score"}, "Count":{"$sum":1}}}]
    pipeAggregate(db, pipe1, pipe2)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--host',  default='[[localhost]]', help='Enter host')
    parser.add_argument('--port', type=int,  default='[[27017]]', help='Enter port')
    args = parser.parse_args()
    host = args.host
    port = args.port
    client = MongoClient(host, port)
    database(client.User.Student)

if __name__ == "__main__":
    main()
