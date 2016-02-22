import Cell
import unittest

class testCell(unittest.TestCase):
    
        
    def test_equality(self):
        cell1 = Cell(1,2)
        cell2 = Cell(1,2)
        self.assertEquals(cell1, cell2, "Cell Equality") 
        
        
    def test_inequality(self):
        cell1 = Cell(1,2)
        cell2 = Cell(2,2)
        self.assertNotEquals(cell1, cell2, "Cell Inequality")
