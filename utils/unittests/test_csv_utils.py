import sys
import os
import unittest
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from csv_utils import xls_to_csv


TEST_FILE_DIR = os.path.join(
    os.path.dirname(
        os.path.realpath(__file__)
    ),
    'sample_files/'
)

class UnitTest(unittest.TestCase):

    def test_converting_xls_to_csv(self):
        # TODO compare diff between two files
        src = os.path.join(TEST_FILE_DIR, 'sample.xls')
        output = os.path.join(TEST_FILE_DIR, 'sample.csv')
        xls_to_csv(src, output)
        self.assertTrue(output)


if __name__ == '__main__':
    unittest.main()
