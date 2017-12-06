package figurs;

public class Rook extends Piece {
    private String type;
    private String color;
    public Rook(String type) {
        this.type = type;
	if(this.type == " r"){
            this.color = "white";
        } else {
            this.color = "black";
        }

    }

    public Rook(String type, int row, int col) {
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
	    if((newCol == col && Math.abs(newRow - row) < 8) ||(newRow == row && Math.abs(newCol - col) < 8) ) {
		return true;
	    } else {
		System.out.println("Dont move\n");
		return false;
	    }

    }
}
