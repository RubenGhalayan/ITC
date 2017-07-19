import unittest
import calculator

class test_calc(unittest.TestCase):
    def test_divide(self):
        self.assertEqual(calculator.divide(7, 3), 3)
        self.assertIsNone(calculator.divide(2, 0))
        self.assertEqual(calculator.divide(1, -1), -1)

    def test_calculate(self):
        self.assertEqual(calculator.calculate(2, 2, '+'), 4)
        self.assertEqual(calculator.calculate(-1, -1, '-'), 0)
        self.assertEqual(calculator.calculate(0, -1, '*'), 0)
        self.assertIsNone(calculator.calculate(-1, 0, '/'))

def main():
    unittest.main()

if __name__ == '__main__':
    import xmlrunner
    unittest.main(testRunner=xmlrunner.XMLTestRunner(output='test-reports'))

