from gameoflife.Life import Life
from gameoflife.Cell import Cell
import unittest

class testLife(unittest.TestCase):
    
    def test_can_be_initialised_with_array_of_cells(self):
        initialState = [Cell(1,2), Cell(2,1)]
        life = Life(initialState)
        self.assertEquals(initialState, life.live_cells, "Initialisation")
        
    def test_underpopulation(self):
        life = Life([])
        self.assertFalse(life.cell_should_survive(0), "Cell does not survive with 0 neighbours")


if __name__ == '__main__':
	unittest.main()