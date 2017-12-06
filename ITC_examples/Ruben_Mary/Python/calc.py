import math
import argparse

parser = argparse.ArgumentParser(description='Calculator with few functions')
parser.add_argument('first', action='store', type=float, help='Enter first argument')
parser.add_argument('second', action='store', type=float, help='Enter second argument')
parser.add_argument('oper', action='store', type=str, help='Enter operation')
args = parser.parse_args()

a = args.first
b = args.second
oper = args.oper

def divide(a, b):
    if b != 0:
        return a / b
    print "Division by zero"
    exit()

switch = {    
    '+': a + b,
    '-': a - b,
    '*': a * b,
    '/': divide(a,b),
}
print switch[oper]
