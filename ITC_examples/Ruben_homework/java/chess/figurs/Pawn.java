package figurs;

public class Pawn extends Piece {
    private String type;
    private String color;
    public Pawn(String type) {
        this.type = type;
	if(this.type == " p"){
	    this.color = "white";
	} else {
	    this.color = "black";
	}
    }

    public Pawn(String type, int row, int col) {
        super.setRow(row);
        super.setCol(col);
        this.type = type;
	
    }


    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }
    public String getColor() {
        return this.color;
    }
    
    public boolean step(int row, int col, int newRow, int newCol) { 
	if (Math.abs(newRow - row) == 1 && newCol == col && newCol < 8 && newRow < 8 && newCol >= 0 && newRow >= 0) {
	    return true;
	} else {
	    System.out.println("Wrong location\n");
	    return false;
	}
    }
}
