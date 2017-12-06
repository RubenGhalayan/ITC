package figurs;

public class Knight extends Piece {
    private String type;
    private String color;
    public Knight(String type) {
        this.type = type;
	if(this.type == "kn"){
            this.color = "white";
        } else {
            this.color = "black";
        }
    }

    public Knight(String type, int row, int col) {
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
		int deltaRow = newRow - row;
		int deltaCol = newCol - col;
		if(deltaRow*deltaRow + deltaCol*deltaCol == 5) {
		    return true;
		} else {
		    return false;
		}
    }
}
