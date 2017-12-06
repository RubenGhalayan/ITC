import math

def divide(a, b):
    if b != 0:
        return a / b
    print "Division by zero"
    return None

def calculate(a, b, oper):
    switch = {    
        '+': a + b,
        '-': a - b,
        '*': a * b,
        '/': divide(a,b),
    }
    return switch[oper] 

#a = float(raw_input ('Enter first argument: '))
#b = float(raw_input ('Enter second argument: '))
#oper = str(raw_input ('Enter operation: '))
#print calculate(a, b, oper)
